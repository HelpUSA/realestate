'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Heart, User, LogOut, LayoutDashboard, PlusCircle, ShieldCheck, Menu, X, Map, Building2 } from 'lucide-react';
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
    <header className="sticky top-0 z-50 bg-[#0f172a]/95 backdrop-blur-md border-b border-slate-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo: HelpUS RealEstate (No address in header as requested) */}
        <Link href="/" className="flex items-center gap-3 group">
          <img
            src="/helpus_logo.png"
            alt="HelpUS Logo"
            className="h-11 w-auto object-contain rounded-xl bg-white p-1 shadow-md group-hover:scale-105 transition-transform"
          />
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-2xl tracking-tight text-white font-sans">HelpUS</span>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-600/20 text-blue-400 border border-blue-500/30 tracking-wider">
              REAL ESTATE
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-300">
          <Link
            href="/"
            className={`hover:text-blue-400 transition-colors ${pathname === '/' ? 'text-blue-400 font-bold' : ''}`}
          >
            {t.nav.home}
          </Link>
          <Link
            href="/imoveis"
            className={`hover:text-blue-400 transition-colors ${pathname.startsWith('/imoveis') ? 'text-blue-400 font-bold' : ''}`}
          >
            {t.nav.properties}
          </Link>

          {/* Direct Map Link */}
          <Link
            href="/mapa"
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              pathname === '/mapa'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : 'bg-blue-500/10 text-blue-300 border border-blue-500/30 hover:bg-blue-500/20'
            }`}
          >
            <Map className="w-3.5 h-3.5" /> {t.nav.map}
          </Link>

          <Link
            href="/corretores"
            className={`hover:text-blue-400 transition-colors ${pathname.startsWith('/corretores') ? 'text-blue-400 font-bold' : ''}`}
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
            className="relative p-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-300 hover:text-amber-400 hover:border-amber-500/40 transition-all"
            title={t.nav.favorites}
          >
            <Heart className="w-5 h-5" />
            {favoritesCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-amber-500 text-slate-950 font-bold text-xs rounded-full flex items-center justify-center shadow">
                {favoritesCount}
              </span>
            )}
          </Link>

          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-3 p-1.5 pr-4 rounded-full bg-slate-800 border border-blue-500/30 hover:border-blue-500/60 transition-all text-left"
              >
                <div className="w-9 h-9 rounded-full bg-blue-600/20 border border-blue-400 flex items-center justify-center text-blue-300 font-bold overflow-hidden">
                  {user.avatarUrl ? (
                    <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-5 h-5" />
                  )}
                </div>
                <div className="hidden lg:block">
                  <p className="text-xs font-bold text-white leading-tight">{user.name}</p>
                  <p className="text-[10px] text-blue-400 font-medium">{user.role}</p>
                </div>
              </button>

              {/* Dropdown Menu */}
              {userDropdownOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-slate-900 border border-slate-700 rounded-2xl p-2 shadow-2xl z-50 text-sm">
                  <div className="px-3 py-2 border-b border-slate-800 mb-1">
                    <p className="text-xs text-slate-400">{lang === 'en' ? 'Logged in as' : lang === 'es' ? 'Conectado como' : 'Conectado como'}</p>
                    <p className="text-xs font-bold text-white truncate">{user.email}</p>
                  </div>

                  {user.role === 'CORRETOR' && (
                    <>
                      <Link
                        href="/dashboard"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl text-slate-200 hover:bg-blue-600/10 hover:text-blue-300 transition-colors"
                      >
                        <LayoutDashboard className="w-4 h-4 text-blue-400" />
                        {t.nav.dashboard}
                      </Link>
                      <Link
                        href="/dashboard/corretor/imoveis/novo"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl text-slate-200 hover:bg-blue-600/10 hover:text-blue-300 transition-colors"
                      >
                        <PlusCircle className="w-4 h-4 text-blue-400" />
                        {lang === 'en' ? 'Add New Property' : lang === 'es' ? 'Publicar Inmueble' : 'Cadastrar Imóvel'}
                      </Link>
                    </>
                  )}

                  {user.role === 'CLIENT' && (
                    <Link
                      href="/dashboard"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-slate-200 hover:bg-blue-600/10 hover:text-blue-300 transition-colors"
                    >
                      <Heart className="w-4 h-4 text-amber-400" />
                      {t.nav.favorites}
                    </Link>
                  )}

                  {user.role === 'ADMIN' && (
                    <Link
                      href="/dashboard"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-slate-200 hover:bg-blue-600/10 hover:text-blue-300 transition-colors"
                    >
                      <ShieldCheck className="w-4 h-4 text-blue-400" />
                      {t.nav.dashboard}
                    </Link>
                  )}

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-rose-400 hover:bg-rose-500/10 transition-colors mt-1 border-t border-slate-800/60"
                  >
                    <LogOut className="w-4 h-4" />
                    {t.nav.logout}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition-all border border-slate-700"
              >
                {t.nav.login}
              </Link>
              <Link
                href="/cadastro"
                className="px-4 py-2 rounded-xl text-sm font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/30 hover:scale-[1.02] transition-all"
              >
                {t.nav.register}
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-slate-300 hover:text-blue-400"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 pt-3 pb-6 space-y-4">
          <nav className="flex flex-col gap-3 font-semibold text-sm">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`p-2 rounded-lg ${pathname === '/' ? 'bg-blue-600/20 text-blue-400' : 'text-slate-300'}`}
            >
              {t.nav.home}
            </Link>
            <Link
              href="/imoveis"
              onClick={() => setMobileMenuOpen(false)}
              className={`p-2 rounded-lg ${pathname.startsWith('/imoveis') ? 'bg-blue-600/20 text-blue-400' : 'text-slate-300'}`}
            >
              {t.nav.properties}
            </Link>
            <Link
              href="/mapa"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg bg-blue-500/10 text-blue-300 border border-blue-500/30 flex items-center gap-2"
            >
              <Map className="w-4 h-4" /> {t.nav.map}
            </Link>
            <Link
              href="/corretores"
              onClick={() => setMobileMenuOpen(false)}
              className={`p-2 rounded-lg ${pathname.startsWith('/corretores') ? 'bg-blue-600/20 text-blue-400' : 'text-slate-300'}`}
            >
              {t.nav.realtors}
            </Link>
          </nav>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
            <LanguagePopdown />
            {!user ? (
              <div className="flex items-center gap-2">
                <Link href="/login" className="px-3 py-1.5 text-xs font-semibold text-slate-300 border border-slate-700 rounded-lg">
                  {t.nav.login}
                </Link>
                <Link href="/cadastro" className="px-3 py-1.5 text-xs font-bold bg-blue-600 text-white rounded-lg">
                  {t.nav.register}
                </Link>
              </div>
            ) : (
              <button onClick={handleLogout} className="text-xs text-rose-400 font-semibold flex items-center gap-1">
                <LogOut className="w-4 h-4" /> {t.nav.logout}
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
