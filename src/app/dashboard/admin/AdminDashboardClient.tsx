'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, Users, Building2, MessageSquare, PlusCircle, ExternalLink, Trash2, Edit } from 'lucide-react';

export default function AdminDashboardClient({
  initialUsers,
  totalProperties,
  totalLeads,
}: {
  initialUsers: any[];
  totalProperties: number;
  totalLeads: number;
}) {
  const [users, setUsers] = useState(initialUsers);

  const handleUpdateStatus = async (userId: string, newStatus: string) => {
    try {
      const res = await fetch('/api/portal/admin-users', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, status: newStatus }),
      });

      if (res.ok) {
        setUsers(users.map((u) => (u.id === userId ? { ...u, status: newStatus } : u)));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const realtors = users.filter((u) => u.role === 'CORRETOR');

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 space-y-10 font-sans text-slate-900">
      {/* Super Admin Welcome Banner */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 font-bold text-xs uppercase tracking-widest border border-blue-200">
              <ShieldCheck className="w-4 h-4 text-blue-600" /> Super Admin — helpus.ecommerce@gmail.com
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-sans">
              Painel de Administração <span className="text-blue-600">HelpUS RealEstate</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-600">
              Gerenciamento completo de usuários, aprovação de corretores credenciados, controle de imóveis e leads da plataforma.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/dashboard/corretor/imoveis/novo"
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-600/30 flex items-center gap-2 transition-all"
            >
              <PlusCircle className="w-4 h-4" /> Cadastrar Novo Imóvel
            </Link>
          </div>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Corretores</span>
            <Users className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900">{realtors.length}</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Imóveis no Ar</span>
            <Building2 className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-2xl font-extrabold text-blue-600">{totalProperties}</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Leads Gerados</span>
            <MessageSquare className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-extrabold text-emerald-600">{totalLeads}</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Total Usuários</span>
            <ShieldCheck className="w-4 h-4 text-indigo-600" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900">{users.length}</p>
        </div>
      </div>

      {/* Realtors Management Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">
            Gestão de Corretores & Permissões
          </h2>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-700 uppercase tracking-wider font-bold border-b border-slate-200">
                <tr>
                  <th className="p-4">Corretor / Agência</th>
                  <th className="p-4">E-mail</th>
                  <th className="p-4">CRECI</th>
                  <th className="p-4">Imóveis</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Ação Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                {realtors.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-bold text-slate-900">
                      {r.agencyName || r.name}
                    </td>
                    <td className="p-4">{r.email}</td>
                    <td className="p-4 font-mono text-blue-600 font-bold">{r.creci || 'CRECI 8492-F'}</td>
                    <td className="p-4 font-mono font-bold text-slate-900">{r._count?.properties || 0}</td>
                    <td className="p-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                          r.status === 'ACTIVE'
                            ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                            : 'bg-rose-50 text-rose-600 border border-rose-200'
                        }`}
                      >
                        {r.status === 'ACTIVE' ? 'Ativo' : 'Suspenso'}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      {r.status === 'ACTIVE' ? (
                        <button
                          onClick={() => handleUpdateStatus(r.id, 'BLOCKED')}
                          className="px-3 py-1.5 rounded-xl bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-600 hover:text-white font-bold transition-all"
                        >
                          Suspender
                        </button>
                      ) : (
                        <button
                          onClick={() => handleUpdateStatus(r.id, 'ACTIVE')}
                          className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 hover:bg-emerald-600 hover:text-white font-bold transition-all"
                        >
                          Aprovar / Ativar
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
