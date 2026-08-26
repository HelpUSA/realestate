'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin, Building, Sparkles } from 'lucide-react';
import { translations, getLang, Language } from '@/lib/i18n';
import AmbientMeshBackground from '@/components/AmbientMeshBackground';

export default function HeroSearch() {
  const router = useRouter();
  const [transaction, setTransaction] = useState<'ALL' | 'SALE' | 'RENT'>('ALL');
  const [search, setSearch] = useState('');
  const [type, setType] = useState('ALL');
  const [neighborhood, setNeighborhood] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (transaction !== 'ALL') params.set('transaction', transaction);
    if (search) params.set('search', search);
    if (type !== 'ALL') params.set('type', type);
    if (neighborhood) params.set('neighborhood', neighborhood);
    if (maxPrice) params.set('maxPrice', maxPrice);

    router.push(`/imoveis?${params.toString()}`);
  };

  return (
    <div className="relative min-h-[75vh] flex items-center justify-center pt-10 pb-16 overflow-hidden bg-[#f8fafc]">
      {/* Animated Ambient Glowing Mesh Background */}
      <AmbientMeshBackground />

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center space-y-8">
        {/* Badge Slogan */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold tracking-wider uppercase shadow-sm">
          <Sparkles className="w-4 h-4 text-blue-600" />
          {t.hero.badge}
        </div>

        {/* Hero Title */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 font-sans tracking-tight leading-tight">
            {t.hero.titleLine1}{' '}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 bg-clip-text text-transparent">
              {t.hero.titleHighlight}
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            {t.hero.subtitle}
          </p>
        </div>

        {/* Search Panel Box - Clean White Glassmorphism */}
        <div className="bg-white/95 backdrop-blur-xl p-4 sm:p-6 rounded-3xl border border-slate-200 shadow-2xl space-y-4 text-left">
          {/* Tabs for Transaction Type */}
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3 overflow-x-auto">
            <button
              type="button"
              onClick={() => setTransaction('ALL')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                transaction === 'ALL'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {t.hero.allTransactions}
            </button>
            <button
              type="button"
              onClick={() => setTransaction('SALE')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                transaction === 'SALE'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {t.hero.sale}
            </button>
            <button
              type="button"
              onClick={() => setTransaction('RENT')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                transaction === 'RENT'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {t.hero.rent}
            </button>
          </div>

          {/* Form Controls */}
          <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Input Search Keyword */}
            <div className="relative">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                {lang === 'en' ? 'Keyword / City' : lang === 'es' ? 'Palabra clave / Ciudad' : 'Palavra-chave'}
              </label>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={t.hero.searchPlaceholder}
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-xs font-medium focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Select Neighborhood */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                {lang === 'en' ? 'Neighborhood / Region' : lang === 'es' ? 'Barrio / Región' : 'Bairro / Região'}
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <select
                  value={neighborhood}
                  onChange={(e) => setNeighborhood(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-medium focus:outline-none focus:border-blue-500 focus:bg-white transition-all appearance-none cursor-pointer"
                >
                  <option value="">{lang === 'en' ? 'All Neighborhoods' : lang === 'es' ? 'Todos los Barrios' : 'Todos os Bairros'}</option>
                  <option value="Beira-mar">Beira-mar / Orla</option>
                  <option value="Centro">Centro / Urbano</option>
                  <option value="Condomínio">Condomínio Fechado</option>
                  <option value="Comercial">Zona Comercial</option>
                </select>
              </div>
            </div>

            {/* Select Type */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                {t.hero.propertyType}
              </label>
              <div className="relative">
                <Building className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-medium focus:outline-none focus:border-blue-500 focus:bg-white transition-all appearance-none cursor-pointer"
                >
                  <option value="ALL">{t.hero.allTypes}</option>
                  <option value="APARTMENT">{t.hero.apartment}</option>
                  <option value="HOUSE">{t.hero.house}</option>
                  <option value="PENTHOUSE">{t.hero.penthouse}</option>
                  <option value="LAND">{t.hero.land}</option>
                  <option value="COMMERCIAL">{t.hero.commercial}</option>
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-600/30 flex items-center justify-center gap-2 transition-all transform active:scale-95"
              >
                <Search className="w-4 h-4" /> {t.hero.searchBtn}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
