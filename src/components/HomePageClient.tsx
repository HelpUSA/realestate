'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Sparkles, Building2, Users, MapPin, MessageSquare } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSearch from '@/components/HeroSearch';
import PropertyCard from '@/components/PropertyCard';
import RealtorCard from '@/components/RealtorCard';
import { translations, getLang, Language } from '@/lib/i18n';

interface HomePageClientProps {
  featuredProperties: any[];
  realtors: any[];
}

export default function HomePageClient({ featuredProperties, realtors }: HomePageClientProps) {
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

  // Popular Neighborhoods Data translated
  const popularNeighborhoods = [
    {
      name: 'Cabo Branco',
      desc: lang === 'en' ? 'Beachfront & High Appreciation' : lang === 'es' ? 'Frente al Mar y Alta Plusvalía' : 'Beira-mar e alta valorização',
      img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Altiplano',
      desc: lang === 'en' ? 'Penthouse Duplex & 360° Skyline Views' : lang === 'es' ? 'Áticos Duplex y Vistas 360°' : 'Coberturas duplex e vista 360°',
      img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Manaíra',
      desc: lang === 'en' ? 'Ocean Block & Fine Dining' : lang === 'es' ? 'Cuadra del Mar y Alta Gastronomía' : 'Quadra do mar e gastronomia',
      img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Gulf Shores, AL',
      desc: lang === 'en' ? 'White Sand Beach Condos & Coastal Living' : lang === 'es' ? 'Condominios de Playa y Vida Costera' : 'Condomínios de praia e alto padrão',
      img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col font-sans">
      <Navbar />

      {/* Hero Search Section */}
      <HeroSearch />

      {/* Featured Properties Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-blue-400 font-bold text-xs uppercase tracking-widest">
              <Sparkles className="w-4 h-4 text-blue-400" /> {t.featured.badge}
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-sans text-white">
              {t.featured.title} <span className="text-blue-400">{t.featured.titleHighlight}</span>
            </h2>
            <p className="text-slate-400 text-sm max-w-xl">
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
          <div className="text-center py-16 bg-slate-900/60 rounded-3xl p-8 border border-slate-800">
            <p className="text-slate-400">{t.featured.noProperties}</p>
          </div>
        )}
      </section>

      {/* Popular Locations Section */}
      <section className="py-16 bg-slate-950/80 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-12 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 text-blue-400 font-bold text-xs uppercase tracking-widest">
              <MapPin className="w-4 h-4" /> {lang === 'en' ? 'Prime Coastal Destinations' : lang === 'es' ? 'Ubicaciones de Alta Plusvalía' : 'Localizações Nobres'}
            </div>
            <h2 className="text-3xl font-sans font-extrabold text-white">
              {lang === 'en' ? 'Most Desirable' : lang === 'es' ? 'Barrios Más Buscados en' : 'Bairros Mais Procurados em'} <span className="text-blue-400">{lang === 'en' ? 'Premier Locations' : 'João Pessoa & Gulf Coast'}</span>
            </h2>
            <p className="text-slate-400 text-sm">
              {lang === 'en' ? 'Explore exclusive residences in high-yield coastal regions.' : lang === 'es' ? 'Explora propiedades en las zonas con mayor revalorización.' : 'Explore imóveis nas regiões com maior índice de valorização e qualidade de vida.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularNeighborhoods.map((b) => (
              <Link
                key={b.name}
                href={`/imoveis?neighborhood=${encodeURIComponent(b.name)}`}
                className="group relative aspect-[4/3] rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-blue-500/50 transition-all shadow-xl"
              >
                <img
                  src={b.img}
                  alt={b.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 space-y-1">
                  <h3 className="text-lg font-sans font-bold text-white group-hover:text-blue-400 transition-colors">
                    {b.name}
                  </h3>
                  <p className="text-xs text-slate-300">{b.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Registered Realtors Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center space-y-3 mb-12 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 text-blue-400 font-bold text-xs uppercase tracking-widest">
            <Users className="w-4 h-4" /> {t.realtors.badge}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-sans text-white">
            {t.realtors.title} <span className="text-blue-400">{t.realtors.titleHighlight}</span>
          </h2>
          <p className="text-slate-400 text-sm">
            {t.realtors.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {realtors.map((realtor: any) => (
            <RealtorCard key={realtor.id} realtor={realtor} />
          ))}
        </div>
      </section>

      {/* Platform Features Section */}
      <section className="py-20 bg-slate-950 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-16 max-w-2xl mx-auto">
            <h2 className="text-3xl font-sans font-extrabold text-white">
              {lang === 'en' ? 'Why Choose HelpUS' : lang === 'es' ? 'Ventajas de la Plataforma' : 'Vantagens do Nosso Site'} <span className="text-blue-400">RealEstate</span>
            </h2>
            <p className="text-slate-400 text-sm">
              {lang === 'en' ? 'An integrated ecosystem uniting buyer transparency with realtor autonomy.' : lang === 'es' ? 'Un entorno integrado que une transparencia y autonomía.' : 'Um ambiente integrado que une transparência para clientes e autonomia para corretores.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-900 p-8 rounded-3xl space-y-4 border border-slate-800 hover:border-blue-500/40 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-blue-600/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">
                {lang === 'en' ? 'Unified Showcase' : lang === 'es' ? 'Vitrina Unificada' : 'Vitrine Unificada'}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {lang === 'en' ? 'All verified partner listings presented in a modern, fast-search unified showcase and interactive map.' : lang === 'es' ? 'Todos los inmuebles de agentes verificados expuestos en una vitrina moderna e interactiva.' : 'Todos os imóveis dos corretores parceiros expostos em uma única vitrine elegante e moderna de busca rápida e no mapa.'}
              </p>
            </div>

            <div className="bg-slate-900 p-8 rounded-3xl space-y-4 border border-slate-800 hover:border-blue-500/40 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-blue-600/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">
                {lang === 'en' ? 'Independent Realtor Portal' : lang === 'es' ? 'Portal de Agentes Autónomos' : 'Logins com Autonomia'}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {lang === 'en' ? 'Each licensed agent manages their own portfolio, uploads high-res photos & videos, and receives leads directly.' : lang === 'es' ? 'Cada agente gestiona sus propias ofertas, sube fotos, videos y recibe contactos de clientes.' : 'Cada corretor gerencia suas próprias ofertas, envia fotos, vídeos e recebe mensagens de compradores diretamente.'}
              </p>
            </div>

            <div className="bg-slate-900 p-8 rounded-3xl space-y-4 border border-slate-800 hover:border-blue-500/40 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-blue-600/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">
                {lang === 'en' ? 'Direct Buyer Contacts' : lang === 'es' ? 'Contacto Directo Sin Intermediarios' : 'Contato sem Intermediários'}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {lang === 'en' ? 'Qualified buyer leads route instantly to the listing realtor via WhatsApp (+55 83 99872-1848) or email.' : lang === 'es' ? 'Los contactos de compradores se dirigen al instante al WhatsApp o correo del agente responsable.' : 'Leads de compradores são direcionados na hora para o WhatsApp ou e-mail do corretor responsável pelo imóvel.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
