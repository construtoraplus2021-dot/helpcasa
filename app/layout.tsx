import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'HELPCASA - Reparos Domésticos no ABCD',
  description: 'Encontre eletricistas, encanadores, pintores, pedreiros e profissionais de faxina na região do ABCD.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="pt-BR">
      <body suppressHydrationWarning className="bg-[#f8f9fb] text-[#191c1e] min-h-screen antialiased selection:bg-[#dae2ff]">
        {children}
      </body>
    </html>
  );
}
