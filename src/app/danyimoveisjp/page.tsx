import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PropertyCard from '@/components/PropertyCard';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { ShieldCheck, Phone, MessageCircle, Building2, MapPin, Award, CheckCircle2, Star, Sparkles } from 'lucide-react';
import Link from 'next/link';

export const revalidate = 60;

export default async function DanyImoveisJPPage() {
  const realtor = await prisma.user.findFirst({
    where: {
      OR: [
        { name: { contains: 'Dany' } },
        { email: { contains: 'dany' } },
        { agencyName: { contains: 'DNA' } },
      ],
    },
    include: {
      properties: {
        where: { status: 'AVAILABLE' },
        orderBy: { createdAt: 'desc' },
      },
    },
  });

  if (!realtor) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col font-sans">
      <Navbar />

      {/* Hero Profile Banner */}
      <div className="relative bg-slate-950 border-b border-slate-800 overflow-hidden">
        {/* Background Overlay Image */}
        <div className="h-72 sm:h-96 w-full relative">
          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80"
            alt="Praia do Bessa João Pessoa"
            className="w-full h-full object-cover opacity-35 filter saturate-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-slate-950/60 to-black/60"></div>
        </div>

        {/* Profile Card */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative -mt-32 pb-12">
          <div className="glass-panel-gold rounded-3xl p-6 sm:p-10 border border-amber-500/40 flex flex-col md:flex-row items-center md:items-start gap-8 shadow-2xl">
            {/* Avatar Photo */}
            <div className="w-32 h-32 sm:w-44 sm:h-44 rounded-3xl bg-slate-900 border-4 border-amber-400 overflow-hidden shadow-2xl shrink-0 -mt-20 sm:-mt-24">
              <img
                src={realtor.avatarUrl || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80'}
                alt={realtor.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Realtor Details */}
            <div className="space-y-4 flex-1 text-center md:text-left">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/40 uppercase tracking-wider">
                  Corretora Credenciada
                </span>
                <span className="px-3 py-1 rounded-full bg-slate-900 text-amber-400 text-xs font-mono border border-slate-800 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> {realtor.creci || 'CRECI 19500 PB'}
                </span>
                <span className="px-3 py-1 rounded-full bg-slate-900 text-slate-300 text-xs font-medium border border-slate-800 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" /> Bessa e região - João Pessoa / PB
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-serif font-extrabold text-white">
                Dany Lima <span className="text-gold-gradient">| @danyimoveisjp</span>
              </h1>

              <p className="text-amber-300/90 font-semibold text-sm">
                DNA Imóveis Bessa • Especialista em Compra, Venda e Investimento Imobiliário
              </p>

              <p className="text-slate-300 text-sm max-w-3xl leading-relaxed">
                {realtor.bio}
              </p>

              {/* Guarantees Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
                <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Responsável</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Confiança</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Dedicada</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Atenciosa</span>
                </div>
              </div>
            </div>

            {/* Direct Contact Box */}
            <div className="flex flex-col gap-3 shrink-0 w-full md:w-auto">
              <a
                href={`https://wa.me/5583998624667?text=Olá%20Dany!%20Vi%20sua%20página%20no%20portal%20HelpUS%20Imóveis.`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs text-center flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all"
              >
                <MessageCircle className="w-4 h-4" /> Fale no WhatsApp: (83) 99862-4667
              </a>

              <a
                href="https://www.instagram.com/danyimoveisjp/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-95 text-white font-bold text-xs text-center flex items-center justify-center gap-2 transition-all shadow"
              >
                <Sparkles className="w-4 h-4" /> Ver Instagram @danyimoveisjp
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Properties Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full flex-1 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-800 pb-4 gap-2">
          <div>
            <div className="inline-flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-widest">
              <Sparkles className="w-4 h-4" /> Seleção Exclusiva Bessa & Região
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              Imóveis de <span className="text-gold-gradient">Dany Lima</span>
            </h2>
          </div>
          <p className="text-xs text-slate-400">Total de {realtor.properties.length} ofertas cadastradas</p>
        </div>

        {realtor.properties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {realtor.properties.map((prop: any) => (
              <PropertyCard key={prop.id} property={{ ...prop, realtor }} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 glass-panel rounded-3xl p-8 border border-slate-800">
            <p className="text-slate-400">Nenhum imóvel disponível no momento.</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
