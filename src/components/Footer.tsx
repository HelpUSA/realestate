'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, ShieldCheck, Heart, MessageCircle } from 'lucide-react';
import { translations, getLang, Language } from '@/lib/i18n';

export default function Footer() {
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
  const officialPhone = '5583998721848';
  const whatsappUrl = `https://wa.me/${officialPhone}?text=${encodeURIComponent(t.whatsappMessage)}`;

  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 pt-16 pb-12 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-900">
          {/* Brand & About */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <img
                src="/helpus_logo.png"
                alt="HelpUS Logo"
                className="w-10 h-10 object-contain rounded-xl bg-white p-1 border border-slate-800 shadow-md"
              />
              <span className="font-extrabold text-xl tracking-tight text-white font-serif">HelpUS RealEstate</span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              {t.footer.brandDesc}
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-amber-400 font-semibold">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{t.footer.verifiedBadge}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase">{t.footer.navTitle}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/imoveis?transaction=SALE" className="hover:text-amber-400 transition-colors">
                  {t.footer.forSale}
                </Link>
              </li>
              <li>
                <Link href="/imoveis?transaction=RENT" className="hover:text-amber-400 transition-colors">
                  {t.footer.forRent}
                </Link>
              </li>
              <li>
                <Link href="/mapa" className="text-amber-300 hover:text-amber-400 transition-colors font-bold">
                  🗺️ {t.nav.map}
                </Link>
              </li>
              <li>
                <Link href="/corretores" className="hover:text-amber-400 transition-colors">
                  {t.nav.realtors}
                </Link>
              </li>
            </ul>
          </div>

          {/* Featured Realtors & Agencies */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase">{t.footer.realtorsTitle}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/corretores" className="hover:text-amber-400 transition-colors">
                  Waleska Imóveis Luxo (CRECI 8492-F)
                </Link>
              </li>
              <li>
                <Link href="/corretores" className="hover:text-amber-400 transition-colors">
                  Carlos Eduardo Prime (CRECI 11420-F)
                </Link>
              </li>
              <li>
                <Link href="/cadastro" className="text-xs text-amber-400/80 hover:text-amber-300 hover:underline pt-2 block font-medium">
                  {t.footer.joinRealtor}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Location */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase">{t.footer.contactTitle}</h4>
            <div className="space-y-2.5 text-sm">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{t.footer.location}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 font-semibold transition-colors">
                  +55 (83) 99872-1848
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href="mailto:contact@helpusbr.com" className="hover:text-amber-300 transition-colors">
                  contact@helpusbr.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs gap-4">
          <p>© {new Date().getFullYear()} {t.footer.rights}</p>
          <p className="flex items-center gap-1">
            HelpUS LLC • Baldwin County AL 36542 • Made with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          </p>
        </div>
      </div>
    </footer>
  );
}
