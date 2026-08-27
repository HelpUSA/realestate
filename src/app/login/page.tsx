'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GoogleLoginButton from '@/components/GoogleLoginButton';
import { Building2, Lock, Mail, KeyRound, ShieldCheck } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Erro ao realizar login.');
        setLoading(false);
        return;
      }

      if (data.user.role === 'CORRETOR') {
        window.location.href = '/dashboard/corretor';
      } else if (data.user.role === 'ADMIN') {
        window.location.href = '/dashboard/admin';
      } else {
        window.location.href = '/dashboard/cliente';
      }
    } catch (err) {
      console.error(err);
      setError('Ocorreu um erro ao conectar ao servidor.');
      setLoading(false);
    }
  };

  const handleQuickDemo = (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col font-sans">
      <Navbar />

      <div className="flex-1 flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-6 bg-white p-8 rounded-3xl border border-slate-200 shadow-2xl">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white font-bold flex items-center justify-center mx-auto shadow-md shadow-blue-600/30">
              <Building2 className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 font-sans">Acessar a Plataforma</h2>
            <p className="text-xs text-slate-600">
              Entre com sua conta do Google ou dados cadastrados
            </p>
          </div>

          {/* Google Sign In Button */}
          <GoogleLoginButton label="Entrar com Conta do Google" />

          <div className="relative flex items-center justify-center py-1">
            <div className="border-t border-slate-200 w-full"></div>
            <span className="bg-white px-3 text-[10px] uppercase font-bold text-slate-400 absolute">ou com e-mail</span>
          </div>

          {error && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs font-semibold text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">E-mail</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="email"
                  required
                  placeholder="seuemail@exemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 text-slate-900 text-xs sm:text-sm rounded-xl pl-9 pr-3 py-3 border border-slate-200 focus:border-blue-500 focus:bg-white focus:outline-none transition-all font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Senha</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50 text-slate-900 text-xs sm:text-sm rounded-xl pl-9 pr-3 py-3 border border-slate-200 focus:border-blue-500 focus:bg-white focus:outline-none transition-all font-medium"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-all shadow-md shadow-blue-600/30 active:scale-95"
            >
              {loading ? 'Entrando...' : 'Entrar no Painel'}
            </button>
          </form>

          {/* Quick Demo Logins Box */}
          <div className="pt-4 border-t border-slate-100 space-y-3">
            <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest text-center flex items-center justify-center gap-1">
              <KeyRound className="w-3.5 h-3.5" /> Logins de Demonstração Rápida:
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemo('helpus.ecommerce@gmail.com', 'admin123')}
                className="col-span-2 p-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-xs font-bold text-blue-700 text-center transition-colors flex items-center justify-center gap-1.5"
              >
                <ShieldCheck className="w-4 h-4 text-blue-600" /> HelpUS Admin (helpus.ecommerce@gmail.com)
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('waleska@imoveis.com', '123456')}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-[10px] font-bold text-slate-700 text-center transition-colors"
              >
                Waleska (Corretora)
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('cliente@imoveis.com', '123456')}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-[10px] font-bold text-slate-700 text-center transition-colors"
              >
                Lucas (Cliente)
              </button>
            </div>
          </div>

          <div className="text-center pt-2">
            <p className="text-xs text-slate-500">
              Ainda não tem conta?{' '}
              <Link href="/cadastro" className="text-blue-600 font-bold hover:underline">
                Cadastre-se aqui
              </Link>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
