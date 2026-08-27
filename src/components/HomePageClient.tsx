'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Sparkles, Building2, MapPin, MessageSquare } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSearch from '@/components/HeroSearch';
import PropertyCard from '@/components/PropertyCard';
import { translations, getLang, Language } from '@/lib/i18n';

import PropertyMap from '@/components/PropertyMap';
import { Map } from 'lucide-react';

interface HomePageClientProps {
  featuredProperties: any[];
}

export default function HomePageClient({ featuredProperties }: HomePageClientProps) {
  const [lang, setLang] = useState<Language>('en');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const urlLang = urlParams.get('lang');
      const savedLang = localStorage.getItem('helpus_lang');
      setLang(getLang(urlLang || savedLang || 'en'));
    }
  }, []);

  const t = translations[lang];

  // Flexible Popular Destinations Data
  const popularNeighborhoods = [
    {
      name: lang === 'en' ? 'Beachfront & Coastal' : lang === 'es' ? 'Frente al Mar' : 'Beira-mar & Orla',
      desc: lang === 'en' ? 'Apartments, homes, and vacation residences' : lang === 'es' ? 'Apartamentos, casas y residencias' : 'Apartamentos, casas e residências de praia',
      img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: lang === 'en' ? 'Urban Centers' : lang === 'es' ? 'Centros Urbanos' : 'Centros Urbanos',
      desc: lang === 'en' ? 'Penthouses, modern condos, and city living' : lang === 'es' ? 'Áticos, condominios modernos y ciudad' : 'Coberturas, condomínios modernos e praticidade',
      img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: lang === 'en' ? 'Commercial Spaces' : lang === 'es' ? 'Espacios Comerciales' : 'Espaços Comerciais',
      desc: lang === 'en' ? 'Offices, retail stores, and business hubs' : lang === 'es' ? 'Oficinas, locales comerciales y negocios' : 'Salas comerciais, lojas e escritórios',
      img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: lang === 'en' ? 'Gated Communities' : lang === 'es' ? 'Barrios Privados & Terrenos' : 'Condomínios Fechados',
      desc: lang === 'en' ? 'Houses, lots, and land for custom builds' : lang === 'es' ? 'Casas, lotes y terrenos para construir' : 'Casas, lotes e terrenos para construir',
      img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80',
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col font-sans">
      <Navbar />

      {/* Hero Search Section */}
      <HeroSearch />

      {/* Interactive Property Map Section (Before Featured Portfolio) */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 font-bold text-xs uppercase tracking-widest border border-blue-200">
                <Map className="w-4 h-4 text-blue-600" />
                {lang === 'en' ? 'Interactive Map Navigation' : lang === 'es' ? 'Navegación Interactiva en Mapa' : 'Navegação por Mapa Interativo'}
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-sans">
                {lang === 'en' ? 'Explore Properties on Map' : lang === 'es' ? 'Explora Inmuebles en el Mapa' : 'Explore Imóveis no Mapa'}
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm max-w-xl">
                {lang === 'en'
                  ? 'Zoom, navigate regions, and click property markers to view price, photos, and listing details.'
                  : lang === 'es'
                  ? 'Haz zoom, navega regiones y haz clic en los marcadores para ver precio, fotos y detalles.'
                  : 'Navegue, aplique zoom e clique nos marcadores para ver preços, fotos e abrir a página do imóvel.'}
              </p>
            </div>

            <Link
              href="/mapa"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-200 font-bold text-xs transition-all shrink-0"
            >
              <Map className="w-4 h-4" />
              {lang === 'en' ? 'Full Screen Map ↗' : lang === 'es' ? 'Mapa Completo ↗' : 'Mapa em Tela Cheia ↗'}
            </Link>
          </div>

          <div className="h-[460px] w-full rounded-2xl overflow-hidden shadow-inner">
            <PropertyMap properties={featuredProperties} />
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-widest">
              <Sparkles className="w-4 h-4 text-blue-600" /> {t.featured.badge}
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-sans text-slate-900">
              {t.featured.title} <span className="text-blue-600">{t.featured.titleHighlight}</span>
            </h2>
            <p className="text-slate-600 text-sm max-w-xl">
              {t.featured.subtitle}
            </p>
          </div>

          <Link
            href="/imoveis"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-md shadow-blue-600/30 transition-all shrink-0"
          >
            {t.featured.viewAll} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Property Grid */}
        {featuredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((prop: any) => (
              <PropertyCard key={prop.id} property={prop} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
            <p className="text-slate-500">{t.featured.noProperties}</p>
          </div>
        )}
      </section>

      {/* Flexible Property Categories Section */}
      <section className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-12 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-widest">
              <MapPin className="w-4 h-4 text-blue-600" /> {lang === 'en' ? 'Featured Categories & Regions' : lang === 'es' ? 'Categorías y Regiones Destacadas' : 'Categorias & Regiões em Destaque'}
            </div>
            <h2 className="text-3xl font-sans font-extrabold text-slate-900">
              {lang === 'en' ? 'Explore Properties' : lang === 'es' ? 'Explora Inmuebles en' : 'Explore Imóveis em'} <span className="text-blue-600">{lang === 'en' ? 'Any Location' : lang === 'es' ? 'Cualquier Región' : 'Qualquer Região'}</span>
            </h2>
            <p className="text-slate-600 text-sm">
              {lang === 'en' ? 'Find residential, commercial, and land opportunities across all regions.' : lang === 'es' ? 'Encuentra oportunidades residenciales, comerciales y terrenos en todas las regiones.' : 'Encontre oportunidades residenciais, comerciais e terrenos em diversas regiões.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularNeighborhoods.map((b) => (
              <Link
                key={b.name}
                href="/imoveis"
                className="group relative aspect-[4/3] rounded-3xl overflow-hidden bg-slate-900 border border-slate-200 hover:border-blue-500/50 transition-all shadow-md"
              >
                <img
                  src={b.img}
                  alt={b.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-75"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 space-y-1">
                  <h3 className="text-lg font-sans font-bold text-white group-hover:text-blue-300 transition-colors">
                    {b.name}
                  </h3>
                  <p className="text-xs text-slate-200">{b.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Features Section */}
      <section className="py-20 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-16 max-w-2xl mx-auto">
            <h2 className="text-3xl font-sans font-extrabold text-slate-900">
              {lang === 'en' ? 'Why Choose HelpUS' : lang === 'es' ? 'Ventajas de la Plataforma' : 'Vantagens do Nosso Site'} <span className="text-blue-600">RealEstate</span>
            </h2>
            <p className="text-slate-600 text-sm">
              {lang === 'en' ? 'An integrated ecosystem uniting buyer transparency with realtor autonomy.' : lang === 'es' ? 'Un entorno integrado que une transparencia y autonomía.' : 'Um ambiente integrado que une transparência para clientes e autonomia para corretores.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl space-y-4 border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                {lang === 'en' ? 'Unified Showcase' : lang === 'es' ? 'Vitrina Unificada' : 'Vitrine Unificada'}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {lang === 'en' ? 'All verified partner listings presented in a modern, fast-search unified showcase and interactive map.' : lang === 'es' ? 'Todos los inmuebles de agentes verificados expuestos en una vitrina moderna e interactiva.' : 'Todos os imóveis dos corretores parceiros expostos em uma única vitrine elegante e moderna de busca rápida e no mapa.'}
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl space-y-4 border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                {lang === 'en' ? 'Independent Realtor Portal' : lang === 'es' ? 'Portal de Agentes Autónomos' : 'Logins com Autonomia'}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {lang === 'en' ? 'Each licensed agent manages their own portfolio, uploads photos & details, and receives leads directly.' : lang === 'es' ? 'Cada agente gestiona sus propias ofertas, sube fotos y recibe contactos de clientes.' : 'Cada corretor gerencia suas próprias ofertas, envia fotos, vídeos e recebe mensagens de compradores diretamente.'}
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl space-y-4 border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                {lang === 'en' ? 'Direct Buyer Contacts' : lang === 'es' ? 'Contacto Directo Sin Intermediarios' : 'Contato sem Intermediários'}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {lang === 'en' ? 'Buyer leads route instantly to the listing realtor via WhatsApp (+55 83 99872-1848) or email.' : lang === 'es' ? 'Los contactos de compradores se dirigen al instante al WhatsApp o correo del agente responsable.' : 'Leads de compradores são direcionados na hora para o WhatsApp ou e-mail do corretor responsável pelo imóvel.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
