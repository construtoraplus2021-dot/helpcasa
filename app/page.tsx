'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  MapPin,
  Star,
  ShieldCheck,
  Check,
  AlertCircle,
  Clock,
  ChevronRight,
  ChevronLeft,
  Play,
  Pause,
  ArrowLeft,
  Share2,
  Heart,
  Calendar,
  Zap,
  Droplet,
  Plug,
  Hammer,
  Paintbrush,
  Sparkles,
  Home as HomeIcon,
  Bell,
  MoreVertical,
  ClipboardList,
  User,
  Info,
  CheckCircle2,
  CalendarDays,
  X,
  Plus,
  Send,
  MessageSquare,
  BadgeAlert,
  Leaf,
  Sofa,
  Utensils,
  Bath,
  Bed,
  Trees
} from 'lucide-react';

const CAROUSEL_IMAGES = [
  {
    id: 'sala_antes',
    room: 'Sala de Estar',
    type: 'Antes de Reformar',
    src: '/sala_antes.jpg',
    description: 'Ambiente cru em fase inicial de demolição, fiação exposta e revestimento antigo.',
  },
  {
    id: 'sala_depois',
    room: 'Sala de Estar',
    type: 'Depois de Reformar',
    src: '/sala_depois.jpg',
    description: 'Sala de estar renovada de alto padrão, piso polido, sofá moderno em formato L com toques finos em azul.',
  },
  {
    id: 'quarto_antes',
    room: 'Quarto Integrado',
    type: 'Antes de Reformar',
    src: '/quarto_antes.jpg',
    description: 'Parede de quarto antiga com papel de parede florido desgastado e assoalho original necessitando restauro.',
  },
  {
    id: 'quarto_depois',
    room: 'Quarto Integrado',
    type: 'Depois de Reformar',
    src: '/quarto_depois.jpg',
    description: 'Quarto amplo revitalizado com pintura premium, parede de acento terracota quente e iluminação relaxante.',
  },
  {
    id: 'cozinha_antes',
    room: 'Cozinha Planejada',
    type: 'Antes de Reformar',
    src: '/cozinha_antes.jpg',
    description: 'Estrutura obsoleta, paredes descascando e pias provisórias antes da reforma de alvenaria.',
  },
  {
    id: 'cozinha_depois',
    room: 'Cozinha Planejada',
    type: 'Depois de Reformar',
    src: '/cozinha_depois.jpg',
    description: 'Mobiliário planejado escuro, bancadas luxuosas em granito escuro estruturado e acabamento impecável.',
  },
  {
    id: 'banheiro_antes',
    room: 'Banheiro Residencial',
    type: 'Antes de Reformar',
    src: '/banheiro_antes.jpg',
    description: 'Banheiro antigo com azulejos desgastados, banheira antiga sem revestimento moderno e pia pedestal.',
  },
  {
    id: 'banheiro_depois',
    room: 'Banheiro Residencial',
    type: 'Depois de Reformar',
    src: '/banheiro_depois.jpg',
    description: 'Bancada dupla refinada em mármore claro, armários em verniz de alta durabilidade e iluminação embutida superior.',
  }
];

// Structuring the Professionals database
interface Professional {
  id: 'julio' | 'ana';
  name: string;
  title: string;
  rating: number;
  reviewsCount: number;
  yearsOfXp: number;
  servicesCompleted: number;
  bio: string;
  location: string;
  verified: boolean;
  avatar: string;
  cover: string;
  categories: ('hydraulic' | 'electrical' | 'masonry' | 'painting' | 'cleaning')[];
  specialties: string[];
  testimonials: {
    author: string;
    text: string;
    rating: number;
    initial: string;
    bgColor: string;
  }[];
  portfolio: {
    src: string;
    alt: string;
  }[];
}

const PROFESSIONALS: Record<'julio' | 'ana', Professional> = {
  julio: {
    id: 'julio',
    name: 'Julio Silveira',
    title: 'Pedreiro Master, Especialista em Salas de Estar, Pintor e Eletricista',
    rating: 4.9,
    reviewsCount: 128,
    yearsOfXp: 30,
    servicesCompleted: 1200,
    bio: 'Especialista em obras, decoração e reformas residenciais com mais de 30 anos de experiência. Foco em salas de estar de alto padrão e acabamento fino. Atendimento de excelência na região do ABCD com pontualidade e limpeza após o serviço.',
    location: 'Santo André / ABCD',
    verified: true,
    avatar: '/julio_avatar.png',
    cover: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=800',
    categories: ['masonry', 'hydraulic', 'painting', 'electrical'],
    specialties: ['Assentamento de Pisos', 'Reboco e Alvenaria', 'Pintura Residencial', 'Pequenos Reparos'],
    testimonials: [
      {
        author: 'Ricardo Souza',
        text: 'O Sr. Julio é um profissional de mão cheia. Fez a reforma da minha cozinha com perfeição e organização. Recomendo muito!',
        rating: 5,
        initial: 'R',
        bgColor: 'bg-blue-100 text-blue-800'
      },
      {
        author: 'Mariana Costa',
        text: 'Serviço impecável! Ricardo resolveu um vazamento que outros dois encanadores não achavam. Super recomendo.',
        rating: 5,
        initial: 'M',
        bgColor: 'bg-purple-100 text-purple-800'
      },
      {
        author: 'João Pedro',
        text: 'Muito pontual e organizado. Explicou todo o processo e deixou a cozinha limpa após a instalação.',
        rating: 5,
        initial: 'J',
        bgColor: 'bg-teal-100 text-teal-800'
      }
    ],
    portfolio: [
      {
        src: 'https://images.unsplash.com/photo-1542013936693-8848e574047e?auto=format&fit=crop&q=80&w=600',
        alt: 'Reparo hidráulico estrutural'
      },
      {
        src: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=600',
        alt: 'Organização de canteiro'
      },
      {
         src: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=600',
         alt: 'Equipamento e acabamento'
      }
    ]
  },
  ana: {
    id: 'ana',
    name: 'Ana Costa',
    title: 'Especialista em Limpeza de Terrenos e Jardinagem',
    rating: 5.0,
    reviewsCount: 85,
    yearsOfXp: 10,
    servicesCompleted: 750,
    bio: 'Especialista em limpeza de terrenos, roçagem de mato alto, jardinagem e paisagismo residencial com mais de 10 anos de experiência. Foco extremo em organização de áreas externas, remoção de entulhos e embelezamento de quintais. Atendimento profissional na região do ABCD.',
    location: 'São Bernardo do Campo / ABCD',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
    cover: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&q=80&w=800',
    categories: ['cleaning', 'cleaning'],
    specialties: ['Limpeza de Terrenos', 'Roçagem de Grama', 'Poda e Jardinagem', 'Remoção de Mato e Entulho'],
    testimonials: [
      {
        author: 'Maria Oliveira',
        text: 'A Ana é extremamente detalhista. Deixou meu terreno totalmente limpo e plano, e fez um trabalho de jardinagem lindo!',
        rating: 5,
        initial: 'M',
        bgColor: 'bg-pink-100 text-pink-800'
      },
      {
        author: 'Carlos Lima',
        text: 'Excelente profissional, pontual e muito caprichosa. Recomendo muito para limpeza de mato alto e roçagem!',
        rating: 5,
        initial: 'C',
        bgColor: 'bg-orange-100 text-orange-800'
      }
    ],
    portfolio: [
      {
        src: 'https://images.unsplash.com/photo-1598902108854-10e335adac99?auto=format&fit=crop&q=80&w=800',
        alt: 'Terreno roçado e limpo'
      },
      {
        src: 'https://images.unsplash.com/photo-1534710961216-75c9d402f03e?auto=format&fit=crop&q=80&w=800',
        alt: 'Jardim restaurado com paisagismo'
      },
      {
        src: 'https://images.unsplash.com/photo-1584483764436-ed9818bad0bb?auto=format&fit=crop&q=80&w=800',
        alt: 'Roçadoras e ferramentas profissionais'
      }
    ]
  }
};

interface BeforeAfterCardProps {
  id: string;
  title: string;
  beforeSrc: string;
  afterSrc: string;
  icon: React.ReactNode;
  onSelect: () => void;
}

function BeforeAfterCard({ id, title, beforeSrc, afterSrc, icon, onSelect }: BeforeAfterCardProps) {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(pct);
  };

  return (
    <div className="flex flex-col rounded-2xl overflow-hidden shadow-sm border border-[#edeef0] bg-white group select-none relative">
      {/* Slider Interactive Area */}
      <div
        id={`before-after-${id}`}
        ref={containerRef}
        onMouseMove={(e) => handleMove(e.clientX)}
        onTouchMove={(e) => {
          if (e.touches[0]) {
            handleMove(e.touches[0].clientX);
          }
        }}
        className="relative h-28 w-full overflow-hidden cursor-ew-resize"
      >
        {/* BEFORE IMAGE */}
        <Image 
          src={beforeSrc}
          alt={`${title} Antes`}
          fill
          sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 20vw"
          referrerPolicy="no-referrer"
          className="object-cover pointer-events-none"
        />
        
        {/* AFTER IMAGE (CLIPPED) */}
        <div 
          className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
        >
          <Image 
            src={afterSrc}
            alt={`${title} Depois`}
            fill
            sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 20vw"
            referrerPolicy="no-referrer"
            className="object-cover pointer-events-none"
          />
        </div>

        {/* Escurecimento inferior para contraste de texto */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

        {/* Badges Antes e Depois */}
        <span className="absolute top-2 left-2 px-1 py-0.5 rounded bg-black/75 text-[8px] font-black text-red-400 uppercase tracking-widest z-20 pointer-events-none">
          Antes
        </span>
        <span className="absolute top-2 right-2 px-1 py-0.5 rounded bg-[#0052cc]/90 text-[8px] font-black text-emerald-400 uppercase tracking-widest z-20 pointer-events-none">
          Depois
        </span>

        {/* Shifting dividing line with arrows indicator */}
        <div 
          className="absolute top-0 bottom-0 w-0.5 bg-white shadow-xl pointer-events-none z-20"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white text-[#191c1e] flex items-center justify-center text-[9px] font-black shadow-lg border border-[#edeef0]">
            ↔
          </div>
        </div>
      </div>

      {/* Interactive Selection Footer */}
      <button
        onClick={onSelect}
        className="w-full flex items-center justify-between px-3 py-2.5 bg-slate-50 hover:bg-[#0052cc] hover:text-white transition-all text-[#191c1e] text-left cursor-pointer border-t border-[#edeef0]"
      >
        <div className="flex items-center gap-1.5 min-w-0">
          {icon}
          <span className="font-extrabold text-xs tracking-tight truncate">{title}</span>
        </div>
        <span className="text-[9px] font-bold uppercase tracking-wider opacity-85 group-hover:opacity-100 shrink-0">Ver →</span>
      </button>
    </div>
  );
}

interface Order {
  id: string;
  professionalId: 'julio' | 'ana';
  category: string;
  date: string;
  slot: string;
  description: string;
  estimatedCost: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  address: string;
  isEmergency: boolean;
}

export default function Home() {
  // Navigation states
  const [currentTab, setCurrentTab] = useState<'home' | 'search' | 'orders' | 'profile'>('home');
  const [selectedProfessional, setSelectedProfessional] = useState<null | 'julio' | 'ana'>(null);
  
  // Carousel states
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isCarouselAutoplay, setIsCarouselAutoplay] = useState(true);

  // Auto-play effect
  useEffect(() => {
    if (!isCarouselAutoplay) return;
    const interval = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % CAROUSEL_IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isCarouselAutoplay]);
  
  // Filters & Queries
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'hydraulic' | 'electrical' | 'masonry' | 'painting' | 'cleaning'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modals & Sheets
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [selectedProfForQuote, setSelectedProfForQuote] = useState<'julio' | 'ana' | 'anyone'>('anyone');
  
  // AI Assistant States
  const [aiInput, setAiInput] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<any | null>(null);

  // Budget wizard form state
  const [budgetAddress, setBudgetAddress] = useState('');
  const [budgetDescription, setBudgetDescription] = useState('');
  const [budgetDate, setBudgetDate] = useState('2026-06-05');
  const [budgetSlot, setBudgetSlot] = useState('09:00 - 12:00');
  const [budgetCategory, setBudgetCategory] = useState<'hydraulic' | 'electrical' | 'masonry' | 'painting' | 'cleaning'>('hydraulic');

  // Interactive scheduler for profiles
  const [schedulerDate, setSchedulerDate] = useState('2026-06-03');
  const [schedulerSlot, setSchedulerSlot] = useState('14:00 - 17:00');

  // Emergency dispatch state
  const [emergencyCategory, setEmergencyCategory] = useState<'hydraulic' | 'electrical' | 'general'>('hydraulic');
  const [emergencyDescription, setEmergencyDescription] = useState('');
  const [emergencyAddress, setEmergencyAddress] = useState('');
  const [emergencyDispatchedMessage, setEmergencyDispatchedMessage] = useState<string | null>(null);

  // User notifications & actions
  const [couponCopied, setCouponCopied] = useState(false);
  const [favoritePros, setFavoritePros] = useState<Record<string, boolean>>({ julio: false, ana: true });

  // Simulated Persistence
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'OS-8392',
      professionalId: 'julio',
      category: 'Eletricista',
      date: '28/05/2026',
      slot: '09:00 - 12:00',
      description: 'Revisão geral do quadro de luz, correção de disjuntor desarmando por sobrecarga na lavanderia.',
      estimatedCost: 'R$ 220,00',
      status: 'completed',
      address: 'Rua das Figueiras, 400 - Bairro Jardim, Santo André',
      isEmergency: false
    },
    {
      id: 'OS-9012',
      professionalId: 'ana',
      category: 'Limpeza de Terrenos e Jardinagem',
      date: '06/06/2026',
      slot: '13:00 - 18:00',
      description: 'Limpeza completa de terreno plano de 250m² com roçagem de mato alto e remoção de entulhos.',
      estimatedCost: 'R$ 380,00',
      status: 'confirmed',
      address: 'Rua Java, 120 - Jardim do Mar, São Bernardo do Campo',
      isEmergency: false
    }
  ]);

  // Handle Category clicking
  const handleCategorySelect = (category: 'hydraulic' | 'electrical' | 'masonry' | 'painting' | 'cleaning') => {
    setSelectedCategory(category);
    setCurrentTab('search');
  };

  // Execute AI Diagnostic from UI
  const handleAiDiagnose = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiInput.trim()) return;
    setAiLoading(true);
    setAiResponse(null);

    try {
      const response = await fetch('/api/gemini/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ problem: aiInput }),
      });
      const data = await response.json();
      if (response.ok) {
        setAiResponse(data);
      } else {
        setAiResponse({ error: data.error || 'Não foi possível completar o diagnóstico.' });
      }
    } catch (err) {
      console.error(err);
      setAiResponse({ error: 'Erro de conexão. Tente novamente mais tarde.' });
    } finally {
      setAiLoading(false);
    }
  };

  // Execute Budget Quote Submission
  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!budgetDescription.trim() || !budgetAddress.trim()) {
      alert('Por favor, preencha a descrição do problema e o endereço de atendimento.');
      return;
    }

    const assignedProfId = selectedProfForQuote === 'anyone' 
      ? (budgetCategory === 'cleaning' ? 'ana' : 'julio')
      : selectedProfForQuote;

    const chosenProf = PROFESSIONALS[assignedProfId];

    const newOrder: Order = {
      id: `OS-${Math.floor(1000 + Math.random() * 9000)}`,
      professionalId: assignedProfId,
      category: budgetCategory === 'hydraulic' ? 'Sala de Estar' : budgetCategory === 'electrical' ? 'Cozinha' : budgetCategory === 'masonry' ? 'Banheiro' : budgetCategory === 'painting' ? 'Quarto' : 'Varanda & Jardim',
      date: new Date(budgetDate).toLocaleDateString('pt-BR'),
      slot: budgetSlot,
      description: budgetDescription,
      estimatedCost: budgetCategory === 'cleaning' ? 'R$ 250 - R$ 380' : 'R$ 180 - R$ 320',
      status: 'pending',
      address: budgetAddress,
      isEmergency: false
    };

    setOrders([newOrder, ...orders]);
    setShowQuoteModal(false);
    setSelectedProfessional(null);
    setCurrentTab('orders');

    // Prefill details and alert user
    // Generate Whatsapp link simulation
    const waText = encodeURIComponent(`Olá ${chosenProf.name}, acabo de abrir um pedido de orçamento (HELPCASA) para ${newOrder.category}. Descrição: ${budgetDescription}. Atendimento no endereço: ${budgetAddress} no dia ${newOrder.date} às ${budgetSlot}.`);
    const waUrl = `https://api.whatsapp.com/send?phone=5511920353558&text=${waText}`;
    
    // Auto trigger redirection helper visually
    setTimeout(() => {
      if (window) {
        const confirmGo = window.confirm(`Pedido simulado com sucesso! Gostaria de abrir o WhatsApp diretamente para enviar os detalhes já preenchidos para ${chosenProf.name}?`);
        if (confirmGo) {
          window.open(waUrl, '_blank');
        }
      }
    }, 400);

    // Reset Form
    setBudgetDescription('');
    setBudgetAddress('');
  };

  // Submit direct calendar scheduling from profile or AI recommendation
  const handleDirectSchedule = (profId: 'julio' | 'ana') => {
    const chosenProf = PROFESSIONALS[profId];
    const categoryName = profId === 'ana' ? 'Limpeza de Terrenos e Jardinagem' : 'Geral';

    const newOrder: Order = {
      id: `OS-${Math.floor(1000 + Math.random() * 9000)}`,
      professionalId: profId,
      category: categoryName,
      date: new Date(schedulerDate).toLocaleDateString('pt-BR'),
      slot: schedulerSlot,
      description: `Agendamento direto via Perfil na plataforma. Atendimento solicitado para ${chosenProf.name}.`,
      estimatedCost: profId === 'ana' ? 'R$ 300,00' : 'R$ 250,00',
      status: 'pending',
      address: 'Endereço cadastrado na conta',
      isEmergency: false
    };

    setOrders([newOrder, ...orders]);
    setSelectedProfessional(null);
    setCurrentTab('orders');

    // Trigger WhatsApp link directly
    const waText = encodeURIComponent(`Olá ${chosenProf.name}! Agendei um atendimento com você via app HELPCASA para o dia ${newOrder.date} no período ${schedulerSlot}. Por favor, me informe seus dados para confirmação da visita!`);
    setTimeout(() => {
      window.open(`https://api.whatsapp.com/send?phone=5511920353558&text=${waText}`, '_blank');
    }, 400);
  };

  // Apply Emergency Triage dispatch
  const handleEmergencyDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emergencyAddress.trim()) {
      alert('Defina o endereço da emergência.');
      return;
    }

    const matchedProfId = emergencyCategory === 'general' ? 'ana' : 'julio';
    const profName = PROFESSIONALS[matchedProfId].name;

    const newOrder: Order = {
      id: `EMERG-${Math.floor(100 + Math.random() * 900)}`,
      professionalId: matchedProfId,
      category: `EMERGÊNCIA - ${emergencyCategory.toUpperCase()}`,
      date: 'Hoje',
      slot: 'Imediato (em até 30 min)',
      description: `ATENDIMENTO DE EMERGÊNCIA: ${emergencyDescription || 'Vazamento ou parada elétrica crítica.'}`,
      estimatedCost: 'R$ 150 taxa de visita urgente + mão de obra',
      status: 'pending',
      address: emergencyAddress,
      isEmergency: true
    };

    setOrders([newOrder, ...orders]);

    setEmergencyDispatchedMessage(`Solicitação recebida com sucesso! O profissional ${profName} foi notificado em modo prioritário e está se deslocando para o endereço: ${emergencyAddress}. Tempo estimado de chegada: 20 a 35 minutos.`);
    
    // Clear triage in 5 seconds
    setTimeout(() => {
      setEmergencyDispatchedMessage(null);
      setShowEmergencyModal(false);
      setEmergencyDescription('');
      setEmergencyAddress('');
      setCurrentTab('orders');
    }, 6000);
  };

  const copyCouponCode = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText('HELPCASA20');
      setCouponCopied(true);
      setTimeout(() => setCouponCopied(false), 2500);
    }
  };

  // Toggle Favorite
  const toggleFavorite = (id: string) => {
    setFavoritePros(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Filter Professionals in the search tab based on filters
  const filteredProfessionals = Object.values(PROFESSIONALS).filter(prof => {
    // category filter
    const matchesCategory = selectedCategory === 'all' || prof.categories.includes(selectedCategory);
    
    // text query
    const matchesQuery = searchQuery === '' || 
      prof.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prof.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prof.specialties.some(spec => spec.toLowerCase().includes(searchQuery.toLowerCase())) ||
      prof.bio.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesQuery;
  });

  return (
    <div id="concerta-ja-app" className="pb-10 max-w-4xl mx-auto bg-[#f8f9fb] shadow-xl min-h-screen relative overflow-x-hidden border-x border-[#edeef0]">
      
      {/* Dynamic Screen View Controller via standard inline layouts */}
      
      {/* 2. Professional Profile Detailed View Overlap */}
      <AnimatePresence>
        {selectedProfessional && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed inset-0 z-50 bg-[#f8f9fb] overflow-y-auto pb-24 max-w-4xl mx-auto shadow-2xl border-x border-[#edeef0]"
          >
            {/* Top Bar Navigation */}
            <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md px-5 h-16 flex justify-between items-center border-b border-[#edeef0]">
              <button 
                onClick={() => setSelectedProfessional(null)}
                className="hover:scale-105 active:scale-95 transition-transform p-1 cursor-pointer text-[#0052cc]"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div className="text-center">
                <span className="font-bold text-lg text-[#191c1e]">
                  {PROFESSIONALS[selectedProfessional].name}
                </span>
                <p className="text-xs text-[#434654] font-medium">Perfil Profissional</p>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => toggleFavorite(selectedProfessional)}
                  className="hover:scale-110 active:scale-95 transition-transform p-1.5 rounded-full hover:bg-slate-100"
                >
                  <Heart className={`w-5 h-5 ${favoritePros[selectedProfessional] ? 'fill-red-500 text-red-500' : 'text-[#434654]'}`} />
                </button>
                <button className="hover:scale-110 active:scale-95 transition-transform p-1.5 rounded-full hover:bg-slate-100">
                  <Share2 className="w-5 h-5 text-[#434654]" />
                </button>
              </div>
            </div>

            {/* Profile Content */}
            <div>
              {/* Cover Banner */}
              <div className="relative h-44 w-full bg-slate-200">
                <Image
                  src={PROFESSIONALS[selectedProfessional].cover}
                  alt={PROFESSIONALS[selectedProfessional].name}
                  fill
                  referrerPolicy="no-referrer"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#191c1e]/65 via-transparent to-transparent" />
              </div>

              {/* Profile Overlap Info */}
              <div className="px-5 -mt-14 relative z-10">
                <div className="bg-white rounded-2xl p-5 shadow-[0px_4px_16px_rgba(0,0,0,0.06)] border border-[#edeef0]">
                  <div className="flex flex-col items-center text-center">
                    {/* Avatar with verify check */}
                    <div className="relative -mt-16 mb-2">
                      <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md bg-white relative">
                        <Image
                          src={PROFESSIONALS[selectedProfessional].avatar}
                          alt={PROFESSIONALS[selectedProfessional].name}
                          fill
                          referrerPolicy="no-referrer"
                          className="object-cover"
                        />
                      </div>
                      {PROFESSIONALS[selectedProfessional].verified && (
                        <div className="absolute bottom-1 right-1 bg-[#0052cc] text-white p-1 rounded-full border-2 border-white shadow-sm">
                          <ShieldCheck className="w-4 h-4 fill-white text-[#0052cc]" />
                        </div>
                      )}
                    </div>

                    {/* Identity summary */}
                    <h2 className="font-bold text-2xl text-[#0052cc]">{PROFESSIONALS[selectedProfessional].name}</h2>
                    <p className="text-[#0052cc] font-semibold text-sm mb-2">{PROFESSIONALS[selectedProfessional].title}</p>
                    
                    {/* Star Badge */}
                    <div className="flex items-center gap-1.5 bg-[#dae2ff] px-3 py-1 rounded-full mb-4">
                      <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                      <span className="font-bold text-[#001848] text-sm">
                        {PROFESSIONALS[selectedProfessional].rating.toFixed(1)}
                      </span>
                      <span className="text-xs text-[#374763] font-medium">
                        ({PROFESSIONALS[selectedProfessional].reviewsCount} avaliações)
                      </span>
                    </div>

                    {/* Bio details */}
                    <p className="text-[#434654] text-sm leading-relaxed mb-4 text-justify">
                      {PROFESSIONALS[selectedProfessional].bio}
                    </p>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-3 w-full border-t border-[#edeef0] pt-4">
                      <div className="bg-[#f3f4f6] p-3 rounded-xl text-center">
                        <p className="font-bold text-xl text-[#0052cc]">
                          {PROFESSIONALS[selectedProfessional].yearsOfXp}+
                        </p>
                        <p className="text-xs text-[#434654] uppercase font-bold">Anos de Experiência</p>
                      </div>
                      <div className="bg-[#f3f4f6] p-3 rounded-xl text-center">
                        <p className="font-bold text-xl text-[#0052cc]">
                          {PROFESSIONALS[selectedProfessional].servicesCompleted}+
                        </p>
                        <p className="text-xs text-[#434654] uppercase font-bold">Serviços Feitos</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Specialties Section */}
              <div className="px-5 mt-6">
                <h3 className="font-bold text-lg text-[#0052cc] mb-3">Especialidades Atendidas</h3>
                <div className="flex flex-wrap gap-2">
                  {PROFESSIONALS[selectedProfessional].specialties.map((spec, i) => (
                    <span 
                      key={i} 
                      className="bg-[#e7e8ea] text-[#191c1e] px-3.5 py-1.5 rounded-full text-xs font-semibold"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Live Interactive Scheduler Reservation block */}
              <div className="px-5 mt-6">
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#edeef0]">
                  <div className="flex items-center gap-2 mb-3 text-[#0052cc]">
                    <Calendar className="w-5 h-5" />
                    <h3 className="font-bold text-base text-[#0052cc]">Reserva Direta de Visita</h3>
                  </div>
                  <p className="text-xs text-[#434654] mb-4">
                    Selecione o melhor dia e período. O profissional receberá a notificação instantaneamente no celular.
                  </p>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div>
                      <label className="block text-xs font-bold text-[#434654] mb-1 uppercase">Dia da Visita</label>
                      <input 
                        type="date" 
                        value={schedulerDate}
                        onChange={(e) => setSchedulerDate(e.target.value)}
                        className="w-full bg-[#f3f4f6] border border-[#c3c6d6] rounded-xl text-xs p-2 focus:ring-2 focus:ring-[#0052cc] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#434654] mb-1 uppercase">Período</label>
                      <select 
                        value={schedulerSlot}
                        onChange={(e) => setSchedulerSlot(e.target.value)}
                        className="w-full bg-[#f3f4f6] border border-[#c3c6d6] rounded-xl text-xs p-2 focus:ring-2 focus:ring-[#0052cc] outline-none"
                      >
                        <option value="08:00 - 12:00">Manhã (08h - 12h)</option>
                        <option value="12:00 - 14:00">Meio-dia (12h - 14h)</option>
                        <option value="14:00 - 17:00">Tarde (14h - 17h)</option>
                        <option value="17:00 - 20:00">Noite (17h - 20h)</option>
                      </select>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDirectSchedule(selectedProfessional)}
                    className="w-full bg-[#0052cc] hover:bg-[#003d9b] text-white py-3 rounded-xl font-bold text-sm transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <CalendarDays className="w-4 h-4" />
                    Confirmar e Agendar no Calendário
                  </button>
                </div>
              </div>

              {/* Portfólio Section */}
              <div className="px-5 mt-6">
                <h3 className="font-bold text-lg text-[#0052cc] mb-3">Portfólio de Projetos</h3>
                <div className="grid grid-cols-3 gap-2">
                  {PROFESSIONALS[selectedProfessional].portfolio.map((item, i) => (
                    <div 
                      key={i} 
                      className="aspect-square relative rounded-xl overflow-hidden bg-slate-100 group cursor-pointer shadow-sm border border-[#edeef0]"
                    >
                      <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        referrerPolicy="no-referrer"
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      {i === 2 && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <span className="text-white font-extrabold text-sm sm:text-base">+12 Fotos</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Client Testimonials Carousel list */}
              <div className="px-5 mt-6 mb-10">
                <h3 className="font-bold text-lg text-[#0052cc] mb-3">Depoimentos Recentes</h3>
                <div className="space-y-3">
                  {PROFESSIONALS[selectedProfessional].testimonials.map((test, i) => (
                    <div 
                      key={i} 
                      className="bg-white p-4 rounded-2xl border border-[#edeef0] shadow-sm relative pl-12"
                    >
                      <div className={`absolute left-3 top-4 w-7 h-7 rounded-full ${test.bgColor} flex items-center justify-center font-bold text-xs`}>
                        {test.initial}
                      </div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-xs text-[#191c1e]">{test.author}</span>
                        <div className="flex text-yellow-500">
                          {Array.from({ length: test.rating }).map((_, idx) => (
                            <Star key={idx} className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-[#434654] italic leading-relaxed">
                        &ldquo;{test.text}&rdquo;
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom floating contact action bar */}
            <div className="fixed bottom-0 left-1/2 -translate-x-1/2 p-4 bg-white/90 backdrop-blur-md border-t border-[#edeef0] z-50 max-w-4xl w-full flex gap-3">
              <button 
                onClick={() => {
                  setSelectedProfForQuote(selectedProfessional);
                  setShowQuoteModal(true);
                }}
                className="flex-1 bg-white hover:bg-slate-50 border-2 border-[#0052cc] text-[#0052cc] font-bold py-3 rounded-full text-xs sm:text-sm active:scale-95 transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
              >
                Solicitar Quota Grátis
              </button>
              
              <button
                onClick={() => {
                  const pName = PROFESSIONALS[selectedProfessional].name;
                  const message = encodeURIComponent(`Olá ${pName}, vi seu perfil excelente no HELPCASA e gostaria de solicitar um orçamento para reparos domésticos no ABCD.`);
                  window.open(`https://api.whatsapp.com/send?phone=5511920353558&text=${message}`, '_blank');
                }}
                className="flex-1 bg-[#25D366] hover:brightness-110 text-white font-bold py-3 rounded-full text-xs sm:text-sm shadow-md flex items-center justify-center gap-1.5 active:scale-95 transition-all cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                Contratar via WhatsApp
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. Header Navigation System */}
      <header className="sticky top-0 bg-white/95 backdrop-blur-md z-40 px-5 h-16 flex items-center justify-between border-b border-[#edeef0] shadow-sm">
        <div className="flex items-center gap-2">
          <div className="bg-[#dae2ff] p-2 rounded-xl text-[#0052cc]">
            <Droplet className="w-5 h-5 fill-current" />
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="font-black text-lg tracking-tight text-[#0052cc]">HELPCASA</span>
              <span className="bg-[#0052cc]/10 text-[#0052cc] px-1.5 py-0.5 rounded text-[9px] font-extrabold uppercase">ABCD</span>
            </div>
            <p className="text-[10px] uppercase font-bold text-[#434654] tracking-widest leading-none">Reparos Domésticos</p>
          </div>
        </div>

        <div className="flex gap-2.5">
          <a 
            href="https://api.whatsapp.com/send?phone=5511920353558&text=Olá! Gostaria de fazer um orçamento sem compromisso para reformas pelo HELPCASA."
            target="_blank"
            rel="noopener noreferrer"
            title="Orçamento sem Compromisso via WhatsApp"
            className="p-2 rounded-full hover:bg-emerald-50 cursor-pointer text-[#25D366] relative active:scale-95 transition-transform"
          >
            <MessageSquare className="w-5 h-5 fill-[#25D366]" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#25D366] rounded-full animate-ping" />
          </a>
          <button 
            onClick={() => setShowEmergencyModal(true)}
            title="Solicitar Emergência 30 Minutos!"
            className="bg-red-100 hover:bg-red-200 text-red-600 p-2 rounded-full cursor-pointer relative active:scale-95 transition-transform"
          >
            <Zap className="w-5 h-5 fill-red-600" />
          </button>
        </div>
      </header>

      {/* Dynamic Sub-header Navigation Tabs (Web design) */}
      <div className="sticky top-16 bg-white/95 backdrop-blur-md border-b border-[#edeef0] px-5 py-3 flex gap-2.5 overflow-x-auto scrollbar-none z-30 justify-start sm:justify-center">
        <button
          onClick={() => {
            setSelectedProfessional(null);
            setCurrentTab('home');
          }}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            currentTab === 'home' && !selectedProfessional ? 'bg-[#0052cc] text-white shadow-sm' : 'bg-slate-50 text-[#434654] hover:bg-slate-100'
          }`}
        >
          <HomeIcon className="w-4 h-4" />
          <span>Início</span>
        </button>

        <button
          onClick={() => {
            setSelectedProfessional(null);
            setCurrentTab('search');
          }}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            currentTab === 'search' ? 'bg-[#0052cc] text-white shadow-sm' : 'bg-slate-50 text-[#434654] hover:bg-slate-100'
          }`}
        >
          <Search className="w-4 h-4" />
          <span>Buscar Profissionais</span>
        </button>

        <button
          onClick={() => {
            setSelectedProfessional(null);
            setCurrentTab('orders');
          }}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer relative ${
            currentTab === 'orders' ? 'bg-[#0052cc] text-white shadow-sm' : 'bg-slate-50 text-[#434654] hover:bg-slate-100'
          }`}
        >
          <ClipboardList className="w-4 h-4" />
          <span>Pedidos</span>
          <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-black leading-none ${currentTab === 'orders' ? 'bg-white text-[#0052cc]' : 'bg-[#0052cc] text-white'}`}>
            {orders.filter(ord => ord.status !== 'completed').length}
          </span>
        </button>

        <button
          onClick={() => {
            setSelectedProfessional(null);
            setCurrentTab('profile');
          }}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            currentTab === 'profile' ? 'bg-[#0052cc] text-white shadow-sm' : 'bg-slate-50 text-[#434654] hover:bg-slate-100'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Minha Conta</span>
        </button>
      </div>

      {/* Primary Dynamic Tabs views */}
      <main className="px-5 pt-6 pb-20">

        {/* TAB 1: HOME PANEL */}
        {currentTab === 'home' && (
          <div className="space-y-6">
            
            {/* Elegant Background-Image Hero Banner */}
            <div className="relative rounded-[32px] overflow-hidden shadow-lg border border-slate-200">
              {/* Background Image using Next.js Image component */}
              <div className="absolute inset-0 z-0 select-none pointer-events-none">
                <Image
                  src="/banner_reforma.png"
                  alt="Reforma é aqui"
                  fill
                  className="object-cover"
                  priority
                  referrerPolicy="no-referrer"
                />
                {/* Advanced Dark Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/65 to-black/35 md:from-slate-950/95 md:via-slate-900/50 md:to-transparent" />
              </div>

              {/* Main Content inside the Banner */}
              <div className="relative z-10 px-6 py-12 sm:px-10 sm:py-16 md:py-20 lg:py-24 text-white flex flex-col justify-center">
                {/* Optional Badge greeting */}
                <span className="inline-flex items-center gap-1.5 self-start px-3.5 py-1.5 rounded-full text-xs font-black bg-[#0052cc] hover:bg-[#0043a4] text-white tracking-wide uppercase mb-4 transition-all shadow-sm">
                  Olá, seja bem-vindo(a)!
                </span>

                {/* Slogan Title */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-[1.1] max-w-2xl mb-3 text-white drop-shadow-sm">
                  Reformas é aqui, a <span className="animate-blink-blue-green font-extrabold select-none">preços super baixos</span>.
                </h1>

                {/* Subtitle / CTA text */}
                <p className="text-base sm:text-lg md:text-xl font-medium text-slate-200 mb-6 sm:mb-8 max-w-xl leading-relaxed drop-shadow-sm uppercase tracking-wide">
                  Peça um orçamento e confira!
                </p>

                {/* Action Row: WhatsApp CTA button and Search container */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 max-w-2xl w-full">
                  {/* WhatsApp CTA Button */}
                  <a
                    href="https://api.whatsapp.com/send?phone=5511920353558&text=Olá! Gostaria de fazer um orçamento sem compromisso para reformas pelo HELPCASA."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-[#25d366] hover:bg-[#20ba5a] active:scale-95 text-white text-sm font-black px-6 py-3.5 rounded-2xl shadow-md transition-all whitespace-nowrap cursor-pointer shrink-0"
                  >
                    <MessageSquare className="w-5 h-5 shrink-0" />
                    <span>Solicitar Orçamento</span>
                  </a>

                  {/* Integrated Search Input bar */}
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Ex: Vazamento, tomada queimada, pintura..."
                      className="w-full bg-slate-900/60 backdrop-blur-md border border-white/20 pl-11 pr-4 py-3.5 rounded-2xl text-sm text-white placeholder-slate-400 shadow-inner focus:bg-slate-900/85 focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/20 transition-all outline-none"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          setCurrentTab('search');
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Elegant Image Carousel of Real Works */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-[#0052cc] text-lg lg:text-xl tracking-tight">Veja algumas obras nossas</h3>
                <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
                  <button
                    onClick={() => setIsCarouselAutoplay(!isCarouselAutoplay)}
                    className="p-1 rounded-lg text-[#0052cc] hover:bg-white transition-all cursor-pointer shadow-sm"
                    title={isCarouselAutoplay ? "Pausar reprodução automática" : "Iniciar reprodução automática"}
                  >
                    {isCarouselAutoplay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                  <span className="text-[10px] font-bold text-slate-500 tracking-tight px-1 uppercase shrink-0">
                    Auto-Play
                  </span>
                </div>
              </div>

              {/* Main Carousel viewport */}
              <div 
                className="relative aspect-video sm:aspect-[16/9] lg:aspect-[21/9] w-full bg-slate-900 rounded-3xl overflow-hidden shadow-lg group border border-slate-200 select-none"
                onMouseEnter={() => setIsCarouselAutoplay(false)}
                onMouseLeave={() => setIsCarouselAutoplay(true)}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={carouselIndex}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <Image
                      src={CAROUSEL_IMAGES[carouselIndex].src}
                      alt={`${CAROUSEL_IMAGES[carouselIndex].room} - ${CAROUSEL_IMAGES[carouselIndex].type}`}
                      fill
                      priority={carouselIndex === 0}
                      referrerPolicy="no-referrer"
                      className="object-cover"
                      unoptimized
                    />

                    {/* Gradient shadows overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/30" />

                    {/* Badges: Room title & type */}
                    <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
                      <span className="px-3.5 py-1.5 rounded-full text-xs font-extrabold text-white bg-black/50 backdrop-blur-md border border-white/20 shadow-sm">
                        {CAROUSEL_IMAGES[carouselIndex].room}
                      </span>
                    </div>

                    <div className="absolute top-4 right-4 z-10">
                      <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider shadow-md text-white border border-white/15 ${
                        CAROUSEL_IMAGES[carouselIndex].type.includes('Antes') 
                          ? 'bg-rose-500/90 backdrop-blur-sm' 
                          : 'bg-emerald-500/90 backdrop-blur-sm'
                      }`}>
                        {CAROUSEL_IMAGES[carouselIndex].type}
                      </span>
                    </div>

                    {/* Content / Descriptions */}
                    <div className="absolute bottom-6 left-6 right-6 text-white z-10">
                      <div className="max-w-2xl space-y-1">
                        <p className="text-[10px] font-extrabold text-slate-300 uppercase tracking-wider">
                          Portfólio de Obras • {carouselIndex + 1} de {CAROUSEL_IMAGES.length}
                        </p>
                        <p className="text-sm font-semibold tracking-tight text-slate-100 drop-shadow-sm leading-relaxed">
                          {CAROUSEL_IMAGES[carouselIndex].description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Left navigation arrow button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setCarouselIndex((prev) => (prev - 1 + CAROUSEL_IMAGES.length) % CAROUSEL_IMAGES.length);
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 hover:bg-black/60 border border-white/10 text-white transition-all scale-95 hover:scale-105 active:scale-95 cursor-pointer z-10 backdrop-blur-sm flex items-center justify-center shadow-lg"
                  aria-label="Imagem Anterior"
                >
                  <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
                </button>

                {/* Right navigation arrow button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setCarouselIndex((prev) => (prev + 1) % CAROUSEL_IMAGES.length);
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 hover:bg-black/60 border border-white/10 text-white transition-all scale-95 hover:scale-105 active:scale-95 cursor-pointer z-10 backdrop-blur-sm flex items-center justify-center shadow-lg"
                  aria-label="Próxima Imagem"
                >
                  <ChevronRight className="w-5 h-5 stroke-[2.5]" />
                </button>

                {/* Slide Indicators / Dots */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10 bg-black/20 backdrop-blur-md px-3.5 py-2 rounded-full border border-white/10">
                  {CAROUSEL_IMAGES.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCarouselIndex(idx)}
                      className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                        carouselIndex === idx 
                          ? 'w-6 bg-white shadow-sm' 
                          : 'w-2.5 bg-white/40 hover:bg-white/75'
                      }`}
                      aria-label={`Ir para slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Premium Discount Promo Banner Card */}
            <div className="relative bg-[#0052cc] rounded-2xl overflow-hidden text-white shadow-md p-6 flex flex-col justify-center min-h-44 border border-blue-700">
              {/* Decorative soft circles */}
              <div className="absolute top-0 right-0 w-36 h-36 bg-blue-600/30 rounded-full blur-2xl" />
              <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-blue-500/20 rounded-full blur-xl" />

              <div className="relative z-10 max-w-xs space-y-2">
                <span className="bg-yellow-400 text-[#001848] px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase">Promoção de Lançamento</span>
                <h3 className="font-extrabold text-2xl tracking-tight leading-tight">Primeira vez por aqui?</h3>
                <p className="text-xs text-blue-100 font-medium">
                  Ganhe <span className="font-bold text-yellow-300">20% de desconto</span> no seu primeiro serviço utilizando o cupom abaixo:
                </p>

                <div className="flex gap-2 items-center pt-1.5">
                  <button 
                    onClick={copyCouponCode}
                    className="bg-white text-[#0052cc] py-2 px-4 rounded-xl text-xs font-black flex items-center gap-1.5 shadow-sm active:scale-95 transition-transform cursor-pointer"
                  >
                    {couponCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        Copiado!
                      </>
                    ) : (
                      <>
                        HELPCASA20
                      </>
                    )}
                  </button>
                  <span className="text-[10px] text-blue-200 font-semibold italic">*Válido até 30/08/2026</span>
                </div>
              </div>
            </div>

            {/* WhatsApp Budget CTA banner */}
            <a 
              href="https://api.whatsapp.com/send?phone=5511920353558&text=Olá! Gostaria de fazer um orçamento sem compromisso para reformas pelo HELPCASA."
              target="_blank"
              rel="noopener noreferrer"
              id="ai-assistant-section"
              className="block bg-gradient-to-r from-[#25D366] to-[#128C7E] rounded-2xl p-6 text-white shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer border border-[#1ebd59]/20"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-white/20 p-2 rounded-xl">
                  <MessageSquare className="w-6 h-6 fill-white text-white" />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg tracking-tight uppercase text-white">Orçamento sem Compromisso</h3>
                </div>
              </div>
              <p className="font-semibold text-sm leading-relaxed mb-4">
                Clique aqui para fazer um orçamento sem compromisso. Fale diretamente conosco pelo WhatsApp e tire suas dúvidas!
              </p>
              <div className="flex items-center gap-2 text-xs font-bold bg-white/20 py-2.5 px-4 rounded-xl w-fit">
                <Zap className="w-4 h-4 fill-white animate-pulse" />
                Falar no WhatsApp
              </div>
            </a>

            {/* Featured Professionals Gallery ("Profissionais em Destaque") */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-extrabold text-[#0052cc] text-base">Profissionais de Destaque</h3>
                <button 
                  onClick={() => {
                    setSelectedCategory('all');
                    setSearchQuery('');
                    setCurrentTab('search');
                  }}
                  className="text-xs text-[#0052cc] font-bold hover:underline cursor-pointer"
                >
                  Ver Todos
                </button>
              </div>

              <div className="space-y-4">
                {Object.values(PROFESSIONALS).map((prof) => (
                  <div 
                    key={prof.id}
                    className="bg-white rounded-2xl border border-[#edeef0] p-4 shadow-sm hover:shadow-md transition-all flex items-start gap-4 relative"
                  >
                    {/* Floating verified badge */}
                    {prof.verified && (
                      <span className="absolute top-4 right-4 bg-[#dae2ff] text-[#0052cc] px-2 py-0.5 rounded-full text-[8.5px] font-extrabold uppercase flex items-center gap-0.5 shadow-sm border border-blue-100">
                        <CheckCircle2 className="w-2.5 h-2.5" />
                        Verificado
                      </span>
                    )}

                    {/* Left avatar with rating */}
                    <div className="flex flex-col items-center shrink-0">
                      <div className="w-16 h-16 rounded-xl overflow-hidden relative shadow-sm bg-slate-50 border border-[#edeef0]">
                        <Image
                          src={prof.avatar}
                          alt={prof.name}
                          fill
                          referrerPolicy="no-referrer"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex items-center gap-1 mt-2 text-yellow-500 bg-yellow-50 px-2 py-0.5 rounded-full border border-yellow-100">
                        <Star className="w-3 h-3 fill-yellow-500" />
                        <span className="text-[11px] font-black">{prof.rating.toFixed(1)}</span>
                      </div>
                    </div>

                    {/* Middle details */}
                    <div className="flex-1 space-y-1 pt-1.5 min-w-0 pr-14">
                      <h4 className="font-black text-sm sm:text-base text-[#0052cc] truncate">{prof.name}</h4>
                      <p className="text-xs text-[#0052cc] font-semibold truncate">{prof.title}</p>
                      
                      {/* Short quote of bio */}
                      <p className="text-[11px] leading-relaxed text-[#434654] line-clamp-2 md:line-clamp-3 text-justify">
                        {prof.bio}
                      </p>

                      {/* Chips tags */}
                      <div className="flex gap-1.5 pt-1 flex-wrap">
                        {prof.specialties.slice(0, 2).map((item, i) => (
                          <span key={i} className="bg-[#f3f4f6] text-[#434654] px-2 py-0.5 rounded text-[9px] font-bold">
                            {item}
                          </span>
                        ))}
                      </div>

                      {/* Navigation arrow button */}
                      <div className="pt-2 flex justify-end">
                        <button
                          onClick={() => setSelectedProfessional(prof.id)}
                          className="text-xs text-[#0052cc] font-black flex items-center hover:underline cursor-pointer"
                        >
                          Visualizar Perfil Completo
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Emergency Service Call-to-Action widget block */}
            <div className="bg-[#ffdad6] border border-red-200 text-[#ba1a1a] rounded-2xl p-5 shadow-sm transition-transform hover:scale-[1.01]">
              <div className="flex justify-between items-start gap-4">
                <div className="space-y-1">
                  <span className="bg-red-700 text-white px-2.5 py-0.5 rounded-full font-extrabold text-[8px] uppercase tracking-wider">Serviço de Urgência</span>
                  <h3 className="font-extrabold text-lg text-[#ba1a1a]">Está com uma Emergência?</h3>
                  <p className="text-xs text-red-800 leading-relaxed font-semibold">
                    Vazamentos severos, curto-circuitos ou chaves desarmando? Encontre um profissional qualificado em até 30 minutos!
                  </p>
                </div>
                <button 
                  onClick={() => setShowEmergencyModal(true)}
                  className="bg-red-600 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-md shrink-0 hover:bg-red-700 active:scale-90 transition-transform cursor-pointer"
                >
                  <Zap className="w-6 h-6 fill-white" />
                </button>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: SEARCH / FILTER PANEL */}
        {currentTab === 'search' && (
          <div className="space-y-5">
            <div>
              <h2 className="text-2xl font-black text-[#0052cc] mb-2">Buscar Profissionais</h2>
              <p className="text-xs text-[#434654]">
                Utilize os filtros abaixo para escolher prestadores aptos para sua solicitação.
              </p>
            </div>

            {/* Advanced Filters */}
            <div className="space-y-3">
              {/* Search String */}
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-[#434654]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filtrar por nome, habilidade ou bio..."
                  className="w-full bg-white border border-[#c3c6d6] pl-10 pr-4 py-2.5 rounded-xl text-xs text-[#191c1e] outline-none shadow-sm focus:ring-2 focus:ring-[#0052cc]"
                />
              </div>

              {/* Grid-style Category tags selector */}
              <div>
                <p className="text-[10px] uppercase font-bold text-[#434654] mb-2 tracking-wider">Filtro de Especialidade</p>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold active:scale-95 transition-all cursor-pointer ${
                      selectedCategory === 'all'
                        ? 'bg-[#0052cc] text-white shadow-sm'
                        : 'bg-white border border-[#edeef0] text-[#434654] hover:bg-slate-50'
                    }`}
                  >
                    Todos
                  </button>
                  <button
                    onClick={() => setSelectedCategory('hydraulic')}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold active:scale-95 transition-all cursor-pointer flex items-center gap-1 ${
                      selectedCategory === 'hydraulic'
                        ? 'bg-[#0052cc] text-white shadow-sm'
                        : 'bg-white border border-[#edeef0] text-[#434654] hover:bg-slate-50'
                    }`}
                  >
                    <Sofa className="w-3.5 h-3.5" />
                    Sala de Estar
                  </button>
                  <button
                    onClick={() => setSelectedCategory('electrical')}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold active:scale-95 transition-all cursor-pointer flex items-center gap-1 ${
                      selectedCategory === 'electrical'
                        ? 'bg-[#0052cc] text-white shadow-sm'
                        : 'bg-white border border-[#edeef0] text-[#434654] hover:bg-slate-50'
                    }`}
                  >
                    <Utensils className="w-3.5 h-3.5 text-orange-500" />
                    Cozinha
                  </button>
                  <button
                    onClick={() => setSelectedCategory('masonry')}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold active:scale-95 transition-all cursor-pointer flex items-center gap-1 ${
                      selectedCategory === 'masonry'
                        ? 'bg-[#0052cc] text-white shadow-sm'
                        : 'bg-white border border-[#edeef0] text-[#434654] hover:bg-slate-50'
                    }`}
                  >
                    <Bath className="w-3.5 h-3.5 text-blue-500" />
                    Banheiro
                  </button>
                  <button
                    onClick={() => setSelectedCategory('painting')}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold active:scale-95 transition-all cursor-pointer flex items-center gap-1 ${
                      selectedCategory === 'painting'
                        ? 'bg-[#0052cc] text-white shadow-sm'
                        : 'bg-white border border-[#edeef0] text-[#434654] hover:bg-slate-50'
                    }`}
                  >
                    <Bed className="w-3.5 h-3.5 text-indigo-500" />
                    Quarto
                  </button>
                  <button
                    onClick={() => setSelectedCategory('cleaning')}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold active:scale-95 transition-all cursor-pointer flex items-center gap-1 ${
                      selectedCategory === 'cleaning'
                        ? 'bg-[#0052cc] text-white shadow-sm'
                        : 'bg-white border border-[#edeef0] text-[#434654] hover:bg-slate-50'
                    }`}
                  >
                    <Trees className="w-3.5 h-3.5 text-emerald-500" />
                    Varanda & Jardim
                  </button>
                </div>
              </div>
            </div>

            {/* Matching Result counters */}
            <div className="flex justify-between items-center text-xs text-[#434654] pt-2">
              <span>Resultado: <span className="font-bold text-[#191c1e]">{filteredProfessionals.length}</span> prestadores encontrados</span>
              {(selectedCategory !== 'all' || searchQuery !== '') && (
                <button 
                  onClick={() => {
                    setSelectedCategory('all');
                    setSearchQuery('');
                  }}
                  className="text-[#0052cc] font-bold hover:underline cursor-pointer"
                >
                  Limpar filtros
                </button>
              )}
            </div>

            {/* List rendered with matchmaker cards */}
            <div className="space-y-4">
              {filteredProfessionals.length > 0 ? (
                filteredProfessionals.map((prof) => (
                  <div 
                    key={prof.id}
                    className="bg-white rounded-2xl border border-[#edeef0] p-4 shadow-sm flex gap-4 hover:shadow-md transition-shadow relative"
                  >
                    {prof.verified && (
                      <span className="absolute top-4 right-4 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full px-2 py-0.5 text-[8px] font-black uppercase flex items-center gap-0.5">
                        <Check className="w-2.5 h-2.5" />
                        Verificado
                      </span>
                    )}

                    <div className="flex flex-col items-center shrink-0">
                      <div className="w-14 h-14 rounded-xl overflow-hidden relative shadow bg-slate-50">
                        <Image
                          src={prof.avatar}
                          alt={prof.name}
                          fill
                          referrerPolicy="no-referrer"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex items-center gap-0.5 text-yellow-500 mt-2 bg-yellow-50 px-1.5 py-0.5 rounded-full">
                        <Star className="w-3 h-3 fill-yellow-500" />
                        <span className="text-[10px] font-black">{prof.rating.toFixed(1)}</span>
                      </div>
                    </div>

                    <div className="flex-1 space-y-1.5 pt-1.5 min-w-0">
                      <h3 className="font-extrabold text-[#0052cc] text-sm truncate">{prof.name}</h3>
                      <p className="text-xs text-[#0052cc] font-semibold truncate leading-none">{prof.title}</p>
                      
                      <p className="text-[11px] text-[#434654] leading-relaxed line-clamp-2 text-justify">
                        {prof.bio}
                      </p>

                      <div className="flex justify-between items-center pt-1.5">
                        <span className="text-[10px] text-[#737685] font-semibold">
                          ABCD • Santo André / São Bernardo
                        </span>

                        <button
                          onClick={() => setSelectedProfessional(prof.id)}
                          className="bg-[#dae2ff] text-[#001848] font-bold px-3 py-1 rounded-lg text-[10px] transition-all hover:bg-[#0052cc] hover:text-white cursor-pointer"
                        >
                          Visualizar
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white rounded-2xl border border-[#edeef0] p-8 text-center space-y-2">
                  <AlertCircle className="w-8 h-8 text-[#737685] mx-auto" />
                  <p className="font-bold text-sm text-[#191c1e]">Nenhum profissional encontrado</p>
                  <p className="text-xs text-[#434654]">
                    Tente reformular sua busca ou selecionar outra categoria.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: CUSTOMER ORDERS / PIPELINE TRACKING */}
        {currentTab === 'orders' && (
          <div className="space-y-5">
            <div>
              <h2 className="text-2xl font-black text-[#0052cc] mb-2">Meus Pedidos</h2>
              <p className="text-xs text-[#434654]">
                Acompanhe em tempo real a situação dos seus orçamentos e visitas agendadas.
              </p>
            </div>

            <div className="space-y-4">
              {orders.length > 0 ? (
                orders.map((ord) => {
                  const correlatedProf = PROFESSIONALS[ord.professionalId];
                  return (
                    <div 
                      key={ord.id}
                      className="bg-white rounded-2xl border border-[#edeef0] p-4 shadow-sm space-y-3"
                    >
                      <div className="flex justify-between items-center gap-2">
                        <span className="font-bold text-xs uppercase text-[#737685]">
                          Pedido: <span className="font-black text-[#191c1e]">{ord.id}</span>
                        </span>
                        
                        {/* Status badges mapping */}
                        <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wide ${
                          ord.status === 'completed' ? 'bg-emerald-100 text-emerald-800' :
                          ord.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                          ord.status === 'pending' ? 'bg-yellow-100 text-yellow-800 font-bold animate-pulse' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {ord.status === 'completed' ? 'Concluído' :
                           ord.status === 'confirmed' ? 'Visita Confirmada' :
                           ord.status === 'pending' ? 'Buscando Aceite' : 'Cancelado'}
                        </span>
                      </div>

                      <div className="flex gap-3 items-center border-[#edeef0] border-y py-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden relative shrink-0 bg-slate-50">
                          <Image
                            src={correlatedProf.avatar}
                            alt={correlatedProf.name}
                            fill
                            referrerPolicy="no-referrer"
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-extrabold text-sm text-[#191c1e] truncate">{correlatedProf.name}</p>
                          <p className="text-xs text-[#0052cc] font-bold leading-none">{ord.category}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="font-extrabold text-xs text-[#191c1e]">{ord.estimatedCost}</p>
                          <p className="text-[10px] text-[#434654] font-medium">Orçamento Estimado</p>
                        </div>
                      </div>

                      <div className="text-xs space-y-1">
                        <p className="text-[#434654] text-justify leading-relaxed">
                          <span className="font-bold text-[#191c1e]">Descrição:</span> {ord.description}
                        </p>
                        <p className="text-[#434654]">
                          <span className="font-bold text-[#191c1e]">Agendado para:</span> {ord.date} às {ord.slot}
                        </p>
                        <p className="text-[#434654] truncate">
                          <span className="font-bold text-[#191c1e]">Endereço:</span> {ord.address}
                        </p>
                      </div>

                      {/* Immediate WhatsApp conversation triggers */}
                      {ord.status !== 'completed' && (
                        <div className="pt-2">
                          <button
                            onClick={() => {
                              const promptText = encodeURIComponent(`Olá ${correlatedProf.name}, ref ao pedido ${ord.id} (${ord.category}) na plataforma HELPCASA. Gostaria de combinar últimos detalhes.`);
                              window.open(`https://api.whatsapp.com/send?phone=5511920353558&text=${promptText}`, '_blank');
                            }}
                            className="w-full bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] py-2 rounded-xl text-xs font-black flex items-center justify-center gap-2 border border-[#25D366]/30 transition-colors cursor-pointer"
                          >
                            <MessageSquare className="w-4 h-4 fill-emerald-600 text-emerald-600" />
                            Avisar Profissional no WhatsApp
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="bg-white rounded-2xl border border-[#edeef0] p-10 text-center space-y-2">
                  <ClipboardList className="w-10 h-10 text-[#737685] mx-auto" />
                  <p className="font-bold text-sm text-[#191c1e]">Sem pedidos nos registros</p>
                  <p className="text-xs text-[#434654]">
                    Utilize o botão de Solicitação na home ou no perfil correspondente para começar.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: END USER PROFILE AND SETTINGS */}
        {currentTab === 'profile' && (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-[#dae2ff] text-[#0052cc] rounded-full flex items-center justify-center relative">
                <User className="w-7 h-7" />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#f8f9fb]" />
              </div>
              <div>
                <h2 className="text-xl font-black text-[#0052cc]">JCS Serviços de Construção</h2>
                <p className="text-xs text-[#434654]">construtoraplus2021@gmail.com</p>
              </div>
            </div>

            {/* Quick stats panel */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white p-4 rounded-xl border border-[#edeef0] text-center shadow-sm">
                <p className="text-xl font-bold text-[#0052cc]">{orders.length}</p>
                <p className="text-xs font-medium text-[#434654]">Pedidos Totais</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-[#edeef0] text-center shadow-sm">
                <p className="text-xl font-bold text-yellow-500">1</p>
                <p className="text-xs font-medium text-[#434654]">Favoritos</p>
              </div>
            </div>

            {/* Simulated Settings controls list */}
            <div className="bg-white rounded-2xl border border-[#edeef0] shadow-sm divide-y divide-[#edeef0] overflow-hidden">
              <div className="p-4 flex justify-between items-center cursor-pointer hover:bg-slate-50 transition-colors">
                <div>
                  <p className="text-sm font-bold text-[#191c1e]">Endereço Principal de Atendimento</p>
                  <p className="text-xs text-[#434654]">Rua das Figueiras, 400 - Bairro Jardim, Santo André - SP</p>
                </div>
                <ChevronRight className="w-5 h-5 text-[#737685]" />
              </div>

              <div className="p-4 flex justify-between items-center cursor-pointer hover:bg-slate-50 transition-colors">
                <div>
                  <p className="text-sm font-bold text-[#191c1e]">Dados de Cobrança e Pagamento</p>
                  <p className="text-xs text-[#434654]">Pix cadastrado sob chave CPF/E-mail</p>
                </div>
                <ChevronRight className="w-5 h-5 text-[#737685]" />
              </div>

              <div className="p-4 flex justify-between items-center cursor-pointer hover:bg-slate-50 transition-colors" onClick={() => setShowEmergencyModal(true)}>
                <div className="flex gap-2 items-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
                  <div>
                    <p className="text-sm font-bold text-[#191c1e]">Acesso Direto à Emergência</p>
                    <p className="text-xs text-[#434654]">Acionamento rápido com técnicos a postos</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-[#737685]" />
              </div>

              <div 
                className="p-4 flex justify-between items-center cursor-pointer hover:bg-slate-50 transition-colors"
                onClick={() => {
                  window.open("https://api.whatsapp.com/send?phone=5511920353558&text=Olá! Preciso de suporte referente à plataforma HELPCASA.", "_blank");
                }}
              >
                <div>
                  <p className="text-sm font-bold text-[#191c1e]">Suporte e Ouvidoria</p>
                  <p className="text-xs text-[#434654]">Fale com nossa central de qualidade direto pelo WhatsApp</p>
                </div>
                <ChevronRight className="w-5 h-5 text-[#737685]" />
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Global Interactive Float WhatsApp Button matches screens on scrolling */}
      <AnimatePresence>
        {!selectedProfessional && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setSelectedProfForQuote('anyone');
              setShowQuoteModal(true);
            }}
            className="fixed bottom-6 right-4 z-40 bg-[#25D366] hover:brightness-110 text-white font-black py-3 px-5 rounded-full shadow-lg flex items-center justify-center gap-1.5 active:scale-95 transition-transform cursor-pointer"
          >
            <MessageSquare className="w-5 h-5 fill-white text-[#25D366]" />
            <span className="text-xs sm:text-sm">Solicitar orçamento</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Elegant Web Footer with Location and Company Address */}
      <footer className="bg-[#191c1e] text-[#edeef0] border-t border-[#2d3135] mt-12">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start mb-8 pb-8 border-b border-[#2d3135]">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="bg-[#0052cc] p-2 rounded-xl text-white">
                  <Droplet className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <span className="font-extrabold text-lg text-white tracking-tight">HELPCASA</span>
                  <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest leading-none">Reparos Domésticos</p>
                </div>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed text-justify max-w-sm">
                A HelpCasa é a principal prestadora de serviços de reformas e reparos especializados do ABCD. Conectamos você aos melhores técnicos profissionais com rapidez, transparência e preços super baixos.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="font-black text-sm text-white uppercase tracking-wider">Localização & Endereço da Empresa</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#0052cc] shrink-0 mt-0.5" />
                  <div className="text-xs text-gray-300">
                    <p className="font-bold text-white mb-0.5">Sede Administrativa / JCS Serviços de Construção:</p>
                    <p>Rua das Figueiras, 400 - Bairro Jardim</p>
                    <p>Santo André - SP, CEP: 09080-300</p>
                  </div>
                </div>


              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-gray-400">
            <p>&copy; {new Date().getFullYear()} HELPCASA. Todos os direitos reservados. JCS Serviços de Construção Ltda.</p>
            <div className="flex gap-4">
              <span>Atendimento ABCD</span>
              <span>•</span>
              <span>Segunda a Sábado: 08h às 20h</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Global Modal Sheet 1: Emergency Triage Dispatch (30 minutes) */}
      <AnimatePresence>
        {showEmergencyModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end justify-center p-4">
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="bg-white rounded-t-3xl w-full max-w-sm sm:max-w-md md:max-w-xl p-6 space-y-4"
            >
              <div className="flex justify-between items-center border-b border-[#edeef0] pb-3">
                <div className="flex items-center gap-2 text-red-600">
                  <Zap className="w-5 h-5 fill-red-600" />
                  <h3 className="font-black text-lg">Central de Emergência urgente</h3>
                </div>
                <button 
                  onClick={() => {
                    setEmergencyDispatchedMessage(null);
                    setShowEmergencyModal(false);
                  }}
                  className="p-1 hover:bg-slate-100 rounded-full cursor-pointer text-[#434654]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {!emergencyDispatchedMessage ? (
                <form onSubmit={handleEmergencyDispatch} className="space-y-4 text-xs">
                  <p className="text-[#4b5563] font-medium leading-relaxed">
                    Nossa equipe disponibilizará um técnico em <span className="font-bold text-red-600">até 30 minutos</span> prioritários no ABCD. Descreva rapidamente o ocorrido.
                  </p>

                  <div>
                    <label className="block font-bold text-[#434654] uppercase mb-1.5">Tipo de Pane / Categoria</label>
                    <select
                      value={emergencyCategory}
                      onChange={(e: any) => setEmergencyCategory(e.target.value)}
                      className="w-full bg-[#f3f4f6] border border-[#c3c6d6] rounded-xl p-2.5 focus:ring-2 focus:ring-[#0052cc] outline-none font-bold"
                    >
                      <option value="hydraulic">Dano Estrutural Crítico / Infiltração na Sala (Água escorrendo)</option>
                      <option value="electrical">Pane Elétrica Geral / Disjuntor desarmado</option>
                      <option value="general">Outros perigos urgentes a resolver</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-[#434654] uppercase mb-1.5">O que aconteceu?</label>
                    <textarea
                      required
                      placeholder="Descreva detalhes (ex: Infiltração severa no teto ou parede da sala com gesso caindo, ou sinto cheiro de fios queimados na tomada...)"
                      value={emergencyDescription}
                      onChange={(e) => setEmergencyDescription(e.target.value)}
                      className="w-full bg-[#f3f4f6] border border-[#c3c6d6] rounded-xl p-3 focus:ring-2 focus:ring-[#0052cc] outline-none min-h-16"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#434654] uppercase mb-1.5">Endereço de Atendimento prioritário</label>
                    <input
                      type="text"
                      required
                      placeholder="Nome da rua, nº, ap, condomínio no ABCD"
                      value={emergencyAddress}
                      onChange={(e) => setEmergencyAddress(e.target.value)}
                      className="w-full bg-[#f3f4f6] border border-[#c3c6d6] rounded-xl p-2.5 focus:ring-2 focus:ring-[#0052cc] outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#ba1a1a] hover:bg-red-800 text-white font-extrabold py-3.5 rounded-xl uppercase hover:shadow-lg active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2 text-sm"
                  >
                    <Zap className="w-4.5 h-4.5 fill-white" />
                    Acionar Central Atendimento Imediato
                  </button>
                </form>
              ) : (
                <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl flex flex-col items-center text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 animate-bounce" />
                  <h4 className="font-black text-base">Atendimento Prioritário Despachado!</h4>
                  <p className="text-xs leading-relaxed font-semibold text-emerald-900">
                    {emergencyDispatchedMessage}
                  </p>
                  <p className="text-[10px] text-emerald-600 font-bold animate-pulse">
                    Redirecionando sua tela para a aba de Pedidos em instantes...
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Global Modal Sheet 2: Standard Budget Quote Booking Wizard */}
      <AnimatePresence>
        {showQuoteModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end justify-center p-4">
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="bg-white rounded-t-3xl w-full max-w-sm sm:max-w-md md:max-w-xl p-6 space-y-4 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center border-b border-[#edeef0] pb-3">
                <h3 className="font-black text-lg text-[#0052cc]">Solicitar Orçamento Gratuito</h3>
                <button 
                  onClick={() => setShowQuoteModal(false)}
                  className="p-1 hover:bg-slate-100 rounded-full cursor-pointer text-[#434654]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleQuoteSubmit} className="space-y-4 text-xs">
                {selectedProfForQuote !== 'anyone' && (
                  <div className="bg-[#dae2ff] p-3 rounded-xl border border-blue-200 flex items-center gap-2">
                    <Info className="w-4 h-4 text-[#0052cc] shrink-0" />
                    <div>
                      <p className="text-[#001848] font-bold">Solicitação Direta para:</p>
                      <p className="text-xs font-semibold text-[#0052cc]">{PROFESSIONALS[selectedProfForQuote].name}</p>
                    </div>
                  </div>
                )}

                {/* Simulated fields */}
                <div>
                  <label className="block font-bold text-[#434654] uppercase mb-1">Categoria de Serviço</label>
                  <select
                    value={budgetCategory}
                    onChange={(e: any) => setBudgetCategory(e.target.value)}
                    className="w-full bg-[#f3f4f6] border border-[#c3c6d6] rounded-xl p-2.5 outline-none font-bold"
                  >
                    <option value="hydraulic">Sala de Estar (Reforma e Decoração)</option>
                    <option value="electrical">Cozinha (Pias, Armários e Elétrica)</option>
                    <option value="masonry">Banheiro (Revestimento e Cuba)</option>
                    <option value="painting">Quarto (Papel de parede, Pintura e Detalhamento)</option>
                    <option value="cleaning">Varanda & Jardim (Decoração externa e Jardinagem)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#434654] uppercase mb-1">Descrição Detalhada do Reparo</label>
                  <textarea
                    required
                    placeholder="Descreva o que necessita ser feito (ex: troca de duas tomadas, reparo de pia vazando, etc.)"
                    value={budgetDescription}
                    onChange={(e) => setBudgetDescription(e.target.value)}
                    className="w-full bg-[#f3f4f6] border border-[#c3c6d6] rounded-xl p-3 outline-none min-h-16"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-[#434654] uppercase mb-1">Dia sugerido</label>
                    <input 
                      type="date"
                      value={budgetDate}
                      onChange={(e) => setBudgetDate(e.target.value)}
                      className="w-full bg-[#f3f4f6] border border-[#c3c6d6] rounded-xl p-2 focus:ring-2 focus:ring-[#0052cc] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-[#434654] uppercase mb-1">Período preferencial</label>
                    <select
                      value={budgetSlot}
                      onChange={(e) => setBudgetSlot(e.target.value)}
                      className="w-full bg-[#f3f4f6] border border-[#c3c6d6] rounded-xl p-2 outline-none"
                    >
                      <option value="09:00 - 12:00">Manhã (09h - 12h)</option>
                      <option value="12:00 - 15:00">Meio-dia (12h - 15h)</option>
                      <option value="15:00 - 18:00">Tarde (15h - 18h)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-[#434654] uppercase mb-1">Endereço de Atendimento</label>
                  <input
                    type="text"
                    required
                    placeholder="Seu endereço completo no ABCD"
                    value={budgetAddress}
                    onChange={(e) => setBudgetAddress(e.target.value)}
                    className="w-full bg-[#f3f4f6] border border-[#c3c6d6] rounded-xl p-2.5 focus:ring-2 focus:ring-[#0052cc] outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#0052cc] hover:bg-[#003d9b] text-white font-extrabold py-3.5 rounded-xl uppercase tracking-wider text-xs shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  Enviar Pedido e Iniciar Whatsapp
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
