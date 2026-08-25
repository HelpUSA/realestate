'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin, Building, Sparkles } from 'lucide-react';
import { translations, getLang, Language } from '@/lib/i18n';

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
    <div className="relative min-h-[75vh] flex items-center justify-center pt-10 pb-16 overflow-hidden bg-slate-950">
      {/* Background Image overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=80"
          alt="Luxury Real Estate"
          className="w-full h-full object-cover opacity-25 scale-105 filter saturate-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/75 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a]/90 via-transparent to-[#0f172a]/90"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center space-y-8">
        {/* Badge Slogan */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-semibold tracking-wider uppercase shadow-lg">
          <Sparkles className="w-4 h-4 text-blue-400" />
          {t.hero.badge}
        </div>

        {/* Hero Title */}
        <div className="space-y-4 max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-6xl font-extrabold font-sans text-white tracking-tight leading-tight">
            {t.hero.titleLine1} <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-300 bg-clip-text text-transparent">{t.hero.titleHighlight}</span>
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {t.hero.subtitle}
          </p>
        </div>

        {/* Search Bar Container (Signature HelpUS Clean Navy Panel) */}
        <div className="bg-slate-900/90 backdrop-blur-xl rounded-3xl p-4 sm:p-6 shadow-2xl max-w-4xl mx-auto border border-slate-800">
          {/* Tabs: Sale / Rent / All */}
          <div className="flex items-center gap-2 mb-4 border-b border-slate-800 pb-3">
            <button
              type="button"
              onClick={() => setTransaction('ALL')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                transaction === 'ALL'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {t.hero.allTransactions}
            </button>
            <button
              type="button"
              onClick={() => setTransaction('SALE')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                transaction === 'SALE'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {t.hero.sale}
            </button>
            <button
              type="button"
              onClick={() => setTransaction('RENT')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                transaction === 'RENT'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {t.hero.rent}
            </button>
          </div>

          {/* Form Inputs Grid */}
          <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {/* Search Term / Keyword */}
            <div className="relative">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 text-left">
                {lang === 'en' ? 'Keyword / Search' : lang === 'es' ? 'Palabra Clave' : 'Palavra-Chave'}
              </label>
              <div className="relative">
                <Search className="w-4 h-4 text-blue-400 absolute left-3 top-3.5" />
                <input
                  type="text"
                  placeholder={t.hero.searchPlaceholder}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-slate-950 text-white placeholder-slate-500 text-xs sm:text-sm rounded-xl pl-9 pr-3 py-3 border border-slate-800 focus:border-blue-500 focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Neighborhood */}
            <div className="relative">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 text-left">
                {lang === 'en' ? 'Neighborhood' : lang === 'es' ? 'Barrio / Región' : 'Bairro / Região'}
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-blue-400 absolute left-3 top-3.5" />
                <select
                  value={neighborhood}
                  onChange={(e) => setNeighborhood(e.target.value)}
                  className="w-full bg-slate-950 text-white text-xs sm:text-sm rounded-xl pl-9 pr-3 py-3 border border-slate-800 focus:border-blue-500 focus:outline-none transition-colors appearance-none"
                >
                  <option value="">{lang === 'en' ? 'All Neighborhoods' : lang === 'es' ? 'Todos los Barrios' : 'Todos os Bairros'}</option>
                  <option value="Cabo Branco">Cabo Branco</option>
                  <option value="Manaíra">Manaíra</option>
                  <option value="Altiplano">Altiplano</option>
                  <option value="Tambaú">Tambaú</option>
                  <option value="Bessa">Bessa</option>
                  <option value="Gulf Shores">Gulf Shores, AL</option>
                  <option value="Orange Beach">Orange Beach, AL</option>
                </select>
              </div>
            </div>

            {/* Property Type */}
            <div className="relative">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 text-left">
                {t.hero.propertyType}
              </label>
              <div className="relative">
                <Building className="w-4 h-4 text-blue-400 absolute left-3 top-3.5" />
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full bg-slate-950 text-white text-xs sm:text-sm rounded-xl pl-9 pr-3 py-3 border border-slate-800 focus:border-blue-500 focus:outline-none transition-colors appearance-none"
                >
                  <option value="ALL">{t.hero.allTypes}</option>
                  <option value="HOUSE">{t.hero.house}</option>
                  <option value="APARTMENT">{t.hero.apartment}</option>
                  <option value="PENTHOUSE">{t.hero.penthouse}</option>
                  <option value="COMMERCIAL">{t.hero.commercial}</option>
                </select>
              </div>
            </div>

            {/* Submit Search Button */}
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full h-[46px] bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all text-sm"
              >
                <Search className="w-4 h-4" />
                {t.hero.searchBtn}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
