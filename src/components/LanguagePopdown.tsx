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
    // 1. Check URL query params
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const urlLang = urlParams.get('lang');
      if (urlLang && ['en', 'es', 'pt'].includes(urlLang)) {
        setLang(urlLang);
        return;
      }

      // 2. Check localStorage
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
        return '🇪🇸 Español';
      case 'pt':
        return '🇧🇷 Português';
      case 'en':
      default:
        return '🇺🇸 English (EN)';
    }
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-200 hover:border-amber-500/40 transition-all"
      >
        <Globe className="w-3.5 h-3.5 text-amber-400" />
        <span>{getLabel(lang)}</span>
        <ChevronDown className="w-3 h-3 text-slate-400" />
      </button>

      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 6px)',
            right: 0,
            background: '#0f172a',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: '12px',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)',
            padding: '6px',
            zIndex: 100,
            minWidth: '150px',
            display: 'flex',
            flexDirection: 'column',
            gap: '2px'
          }}
        >
          <button
            type="button"
            onClick={() => changeLanguage('en')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              width: '100%',
              padding: '8px 12px',
              borderRadius: '8px',
              background: lang === 'en' ? 'rgba(245, 158, 11, 0.15)' : 'transparent',
              color: lang === 'en' ? '#f59e0b' : '#cbd5e1',
              border: 'none',
              fontSize: '0.82rem',
              fontWeight: '600',
              cursor: 'pointer',
              textAlign: 'left'
            }}
          >
            <span>🇺🇸</span> <span>English</span>
          </button>

          <button
            type="button"
            onClick={() => changeLanguage('es')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              width: '100%',
              padding: '8px 12px',
              borderRadius: '8px',
              background: lang === 'es' ? 'rgba(245, 158, 11, 0.15)' : 'transparent',
              color: lang === 'es' ? '#f59e0b' : '#cbd5e1',
              border: 'none',
              fontSize: '0.82rem',
              fontWeight: '600',
              cursor: 'pointer',
              textAlign: 'left'
            }}
          >
            <span>🇪🇸</span> <span>Español</span>
          </button>

          <button
            type="button"
            onClick={() => changeLanguage('pt')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              width: '100%',
              padding: '8px 12px',
              borderRadius: '8px',
              background: lang === 'pt' ? 'rgba(245, 158, 11, 0.15)' : 'transparent',
              color: lang === 'pt' ? '#f59e0b' : '#cbd5e1',
              border: 'none',
              fontSize: '0.82rem',
              fontWeight: '600',
              cursor: 'pointer',
              textAlign: 'left'
            }}
          >
            <span>🇧🇷</span> <span>Português</span>
          </button>
        </div>
      )}
    </div>
  );
}
