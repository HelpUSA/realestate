'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShieldCheck, MessageCircle, ExternalLink, Award } from 'lucide-react';
import { translations, getLang, Language } from '@/lib/i18n';

interface RealtorCardProps {
  realtor: {
    id: string;
    name: string;
    creci?: string | null;
    phone?: string | null;
    whatsapp?: string | null;
    bio?: string | null;
    avatarUrl?: string | null;
    coverUrl?: string | null;
    agencyName?: string | null;
    _count?: { properties: number };
  };
}

export default function RealtorCard({ realtor }: RealtorCardProps) {
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
  const isWaleska = realtor.name.toLowerCase().includes('waleska') || (realtor.agencyName && realtor.agencyName.toLowerCase().includes('waleska'));

  return (
    <div
      className={`group bg-slate-900/90 rounded-3xl overflow-hidden border transition-all duration-300 ${
        isWaleska
          ? 'border-blue-500/60 shadow-xl shadow-blue-500/10 hover:border-blue-400'
          : 'border-slate-800 hover:border-blue-500/40'
      }`}
    >
      {/* Realtor Cover Header */}
      <div className="relative h-28 bg-slate-950 overflow-hidden">
        <img
          src={realtor.coverUrl || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'}
          alt={realtor.name}
          className="w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

        {/* Featured Ribbon */}
        {isWaleska && (
          <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-blue-600 text-white font-extrabold text-[10px] uppercase tracking-wider shadow flex items-center gap-1">
            <Award className="w-3 h-3 text-amber-300" /> {lang === 'en' ? 'Featured Realtor' : lang === 'es' ? 'Agente Destacado' : 'Corretora Destaque'}
          </div>
        )}
      </div>

      {/* Avatar & Info */}
      <div className="px-6 pb-6 pt-0 relative">
        <div className="-mt-12 mb-4 flex items-end justify-between">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-slate-950 border-2 border-blue-400 overflow-hidden shadow-xl">
              {realtor.avatarUrl ? (
                <img src={realtor.avatarUrl} alt={realtor.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-blue-600/20 text-blue-300 font-bold text-2xl flex items-center justify-center">
                  {realtor.name.charAt(0)}
                </div>
              )}
            </div>
            <div className="absolute -bottom-1 -right-1 bg-blue-600 text-white p-1 rounded-full shadow">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs font-bold text-blue-300 bg-blue-500/10 px-2.5 py-1 rounded-full border border-blue-500/30">
              {realtor._count?.properties || 0} {t.realtors.activeListings}
            </span>
          </div>
        </div>

        {/* Name & CRECI */}
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors flex items-center gap-2">
            {realtor.agencyName || realtor.name}
          </h3>
          <p className="text-xs text-slate-400 font-mono flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            {realtor.creci || 'Verified Realtor'}
          </p>
        </div>

        {/* Bio excerpt */}
        <p className="text-xs text-slate-400 line-clamp-2 mt-3 leading-relaxed">
          {realtor.bio || (lang === 'en' ? 'Licensed professional real estate agent ready to assist you.' : lang === 'es' ? 'Agente inmobiliario profesional listo para asesorarte.' : 'Corretor credenciado especializado no mercado imobiliário.')}
        </p>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 mt-5">
          <Link
            href={`/corretores/${realtor.id}`}
            className="py-2 px-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-200 font-semibold text-xs text-center border border-slate-800 flex items-center justify-center gap-1.5 transition-colors"
          >
            {t.realtors.viewProfile} <ExternalLink className="w-3 h-3 text-blue-400" />
          </Link>

          {realtor.whatsapp ? (
            <a
              href={`https://wa.me/${realtor.whatsapp}?text=${encodeURIComponent(t.whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs text-center flex items-center justify-center gap-1.5 shadow transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
            </a>
          ) : (
            <Link
              href={`/corretores/${realtor.id}`}
              className="py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs text-center flex items-center justify-center gap-1.5 transition-colors"
            >
              {t.realtors.viewProfile}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
