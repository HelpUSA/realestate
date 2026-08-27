'use client';

import { useState, useEffect } from 'react';
import { Globe, ChevronDown } from 'lucide-react';

interface LanguagePopdownProps {
  currentLang?: string;
}

export function LanguagePopdown({ currentLang = 'en' }: LanguagePopdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [lang, setLang] = useState<string>(currentLang);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const urlLang = urlParams.get('lang');
      if (urlLang && ['en', 'es', 'pt'].includes(urlLang)) {
        setLang(urlLang);
        return;
      }

      const savedLang = localStorage.getItem('helpus_lang');
      if (savedLang && ['en', 'es', 'pt'].includes(savedLang)) {
        setLang(savedLang);
        return;
      }
    }
  }, []);

  const changeLanguage = (newLang: string) => {
    setLang(newLang);
    setIsOpen(false);
    if (typeof window !== 'undefined') {
      localStorage.setItem('helpus_lang', newLang);
      document.cookie = `helpus_lang=${newLang}; path=/; max-age=31536000`;
      
      const url = new URL(window.location.href);
      url.searchParams.set('lang', newLang);
      window.history.pushState({}, '', url.toString());
      window.location.reload();
    }
  };

  const getLabel = (code: string) => {
    switch (code) {
      case 'es':
        return '🇪🇸 ES';
      case 'pt':
        return '🇧🇷 PT';
      case 'en':
      default:
        return '🇺🇸 EN';
    }
  };

  return (
    <div className="relative inline-block shrink-0">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-200 hover:text-blue-600 transition-all whitespace-nowrap"
      >
        <Globe className="w-3.5 h-3.5 text-blue-600 shrink-0" />
        <span>{getLabel(lang)}</span>
        <ChevronDown className="w-3 h-3 text-slate-400 shrink-0" />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-1.5 w-40 rounded-xl bg-white border border-slate-200 shadow-xl p-1.5 z-50 flex flex-col gap-1 text-slate-800"
        >
          <button
            type="button"
            onClick={() => changeLanguage('en')}
            className={`flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-xs font-semibold text-left transition-colors ${
              lang === 'en' ? 'bg-blue-50 text-blue-600 font-bold' : 'hover:bg-slate-100 text-slate-700'
            }`}
          >
            <span>🇺🇸</span> <span>English (EN)</span>
          </button>
          <button
            type="button"
            onClick={() => changeLanguage('es')}
            className={`flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-xs font-semibold text-left transition-colors ${
              lang === 'es' ? 'bg-blue-50 text-blue-600 font-bold' : 'hover:bg-slate-100 text-slate-700'
            }`}
          >
            <span>🇪🇸</span> <span>Español (ES)</span>
          </button>
          <button
            type="button"
            onClick={() => changeLanguage('pt')}
            className={`flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-xs font-semibold text-left transition-colors ${
              lang === 'pt' ? 'bg-blue-50 text-blue-600 font-bold' : 'hover:bg-slate-100 text-slate-700'
            }`}
          >
            <span>🇧🇷</span> <span>Português (PT)</span>
          </button>
        </div>
      )}
    </div>
  );
}
