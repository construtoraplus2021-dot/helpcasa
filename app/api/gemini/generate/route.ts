import { NextRequest, NextResponse } from "next/server";
import { getGeminiClient } from "@/lib/gemini";
import { Type } from "@google/genai";

export async function POST(req: NextRequest) {
  try {
    const { problem } = await req.json();

    if (!problem || typeof problem !== "string" || !problem.trim()) {
      return NextResponse.json(
        { error: "Por favor, descreva o problema doméstico." },
        { status: 400 }
      );
    }

    const ai = getGeminiClient();

    const systemInstruction = `Você é o assistente virtual inteligente da plataforma "HELPCASA", especialista em triagem de reparos domésticos no Brasil.
Seu objetivo é analisar a descrição do problema doméstico enviada pelo usuário, identificar a categoria correta, estimar o nível de urgência, propor orientações/precauções de segurança importantes para o morador, estimar o custo médio de mercado em BRL (R$) e designar o profissional mais adequado da nossa plataforma para resolver o caso.

Nossos profissionais da plataforma:
1. Julio Silveira (Pedreiro Master, Encanador, Pintor, Eletricista). Especialista com 30 anos de experiência em reformas físicas pesadas, hidráulica estrutural, fiação, quadros de luz, alvenaria, pisos e pequenos reparos.
2. Ana Costa (Especialista em Limpeza de Terrenos e Jardinagem, roçagem, manutenção de quintais, jardinagem e paisagismo residencial, remoção de entulhos).

Análise criteriosa do problema:
- Se o caso envolver roçagem de mato, limpeza de terrenos, jardinagem, paisagismo ou remoção de entulhos de áreas externas, indique preferencialmente Ana Costa.
- Se o caso envolver fiação complexa, reformas pesadas, alvenaria de tijolos, pisos rachados, gesso ou problemas de grande porte elétrico/hidráulico, indique preferencialmente Julio Silveira.
- Outros problemas hidráulicos simples podem ser atendidos por ambos; faça a recomendação mais adequada com base no texto.`;

    const prompt = `Analise o seguinte problema doméstico relatado pelo usuário: "${problem}"`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            classification: {
              type: Type.STRING,
              description: "A categoria principal do serviço: Encanador, Eletricista, Pedreiro, Pintor, Limpeza de Terrenos e Jardinagem ou Outro",
            },
            summary: {
              type: Type.STRING,
              description: "Resumo em poucas palavras do diagnóstico inicial do problema.",
            },
            urgency: {
              type: Type.STRING,
              description: "Nível de urgência: Baixa, Média, Alta ou Crítica",
            },
            precautions: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Lista de 2 a 3 medidas ou precauções práticas imediatas de segurança que o usuário deve tomar.",
            },
            estimatedCost: {
              type: Type.STRING,
              description: "Estimativa de custo médio em Reais, ex: R$ 120 - R$ 220",
            },
            recommendedProfessional: {
              type: Type.STRING,
              description: "Nome do profissional recomendado da nossa equipe: Julio Silveira ou Ana Costa",
            },
            explanation: {
              type: Type.STRING,
              description: "Breve explicação do porquê o problema ocorre e o que o profissional costuma realizar para resolver.",
            },
          },
          required: [
            "classification",
            "summary",
            "urgency",
            "precautions",
            "estimatedCost",
            "recommendedProfessional",
            "explanation",
          ],
        },
      },
    });

    const textOutput = response.text;
    if (!textOutput) {
      throw new Error("Não foi possível gerar conteúdo do Gemini.");
    }

    const data = JSON.parse(textOutput);
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Erro na API do Gemini:", error);
    return NextResponse.json(
      { error: "Ocorreu um erro ao processar o diagnóstico inteligente. Tente novamente mais tarde." },
      { status: 500 }
    );
  }
}
