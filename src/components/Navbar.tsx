'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Heart, User, LogOut, LayoutDashboard, PlusCircle, ShieldCheck, Menu, X, Map } from 'lucide-react';
import { LanguagePopdown } from './LanguagePopdown';
import { translations, getLang, Language } from '@/lib/i18n';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [lang, setLang] = useState<Language>('en');

  useEffect(() => {
    fetchUserAndFavorites();
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const urlLang = urlParams.get('lang');
      const savedLang = localStorage.getItem('helpus_lang');
      setLang(getLang(urlLang || savedLang || 'en'));
    }
  }, [pathname]);

  const t = translations[lang];

  const fetchUserAndFavorites = async () => {
    try {
      const resUser = await fetch('/api/auth/me');
      const dataUser = await resUser.json();
      setUser(dataUser.user);

      if (dataUser.user) {
        const resFav = await fetch('/api/portal/favorites');
        const dataFav = await resFav.json();
        setFavoritesCount(dataFav.favorites?.length || 0);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setUser(null);
    setUserDropdownOpen(false);
    router.push('/');
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo: HelpUS RealEstate */}
        <Link href="/" className="flex items-center gap-3 group">
          <img
            src="/helpus_logo.png"
            alt="HelpUS Logo"
            className="h-11 w-auto object-contain rounded-xl bg-white p-1 border border-slate-200 shadow-sm group-hover:scale-105 transition-transform"
          />
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-2xl tracking-tight text-slate-900 font-sans">HelpUS</span>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-200 tracking-wider">
              REAL ESTATE
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-700">
          <Link
            href="/"
            className={`hover:text-blue-600 transition-colors ${pathname === '/' ? 'text-blue-600 font-bold' : ''}`}
          >
            {t.nav.home}
          </Link>
          <Link
            href="/imoveis"
            className={`hover:text-blue-600 transition-colors ${pathname.startsWith('/imoveis') ? 'text-blue-600 font-bold' : ''}`}
          >
            {t.nav.properties}
          </Link>

          {/* Direct Map Link */}
          <Link
            href="/mapa"
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              pathname === '/mapa'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : 'bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100'
            }`}
          >
            <Map className="w-3.5 h-3.5" /> {t.nav.map}
          </Link>

          <Link
            href="/corretores"
            className={`hover:text-blue-600 transition-colors ${pathname.startsWith('/corretores') ? 'text-blue-600 font-bold' : ''}`}
          >
            {t.nav.realtors}
          </Link>
        </nav>

        {/* Desktop Action & Auth Menu */}
        <div className="hidden md:flex items-center gap-4">
          {/* Language Popdown Dropdown */}
          <LanguagePopdown />

          {/* Favorites counter */}
          <Link
            href="/dashboard"
            className="relative p-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 hover:text-blue-600 hover:border-blue-300 transition-all"
            title={t.nav.favorites}
          >
            <Heart className="w-5 h-5 text-slate-700" />
            {favoritesCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-blue-600 text-white font-bold text-xs rounded-full flex items-center justify-center shadow">
                {favoritesCount}
              </span>
            )}
          </Link>

          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-3 p-1.5 pr-4 rounded-full bg-slate-100 border border-slate-200 hover:border-blue-400 transition-all text-left"
              >
                <div className="w-9 h-9 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center overflow-hidden">
                  {user.avatarUrl ? (
                    <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-5 h-5" />
                  )}
                </div>
                <div className="hidden lg:block">
                  <p className="text-xs font-bold text-slate-900 leading-tight">{user.name}</p>
                  <p className="text-[10px] text-blue-600 font-semibold">{user.role}</p>
                </div>
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white border border-slate-200 shadow-2xl p-2 space-y-1 z-50">
                  <div className="px-3 py-2 border-b border-slate-100 mb-1">
                    <p className="text-xs font-bold text-slate-900">{user.name}</p>
                    <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                  </div>

                  <Link
                    href="/dashboard"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
                  >
                    <LayoutDashboard className="w-4 h-4 text-blue-600" /> {t.nav.dashboard}
                  </Link>

                  {user.role === 'CORRETOR' && (
                    <Link
                      href="/dashboard/corretor/imoveis/novo"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
                    >
                      <PlusCircle className="w-4 h-4 text-emerald-600" /> Cadastrar Imóvel
                    </Link>
                  )}

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors text-left"
                  >
                    <LogOut className="w-4 h-4" /> {t.nav.logout}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-blue-600 hover:bg-slate-100 transition-all"
              >
                {t.nav.login}
              </Link>
              <Link
                href="/cadastro"
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-600/30 transition-all flex items-center gap-1.5"
              >
                <ShieldCheck className="w-4 h-4" /> {t.nav.register}
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-800"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <LanguagePopdown />
          </div>

          <nav className="flex flex-col space-y-2 text-sm font-semibold text-slate-800">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-xl hover:bg-slate-100">
              {t.nav.home}
            </Link>
            <Link href="/imoveis" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-xl hover:bg-slate-100">
              {t.nav.properties}
            </Link>
            <Link href="/mapa" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-xl bg-blue-50 text-blue-700 font-bold flex items-center gap-2">
              <Map className="w-4 h-4" /> {t.nav.map}
            </Link>
            <Link href="/corretores" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-xl hover:bg-slate-100">
              {t.nav.realtors}
            </Link>
          </nav>

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-xl bg-slate-100 font-bold text-xs text-slate-800"
                >
                  {t.nav.dashboard} ({user.name})
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-center py-2.5 rounded-xl bg-rose-50 text-rose-600 font-bold text-xs"
                >
                  {t.nav.logout}
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-xl bg-slate-100 text-slate-800 font-bold text-xs"
                >
                  {t.nav.login}
                </Link>
                <Link
                  href="/cadastro"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs"
                >
                  {t.nav.register}
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
