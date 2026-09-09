'use client';

import React, { useState } from 'react';
import { X, Calculator, DollarSign, Send, CheckCircle2, Building2 } from 'lucide-react';

interface FinancingCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FinancingCalculatorModal: React.FC<FinancingCalculatorModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const [propertyValue, setPropertyValue] = useState<number>(500000);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [years, setYears] = useState<number>(30);
  const [annualRate, setAnnualRate] = useState<number>(10.5); // 10.5% a.a.
  const [system, setSystem] = useState<'SAC' | 'PRICE'>('SAC');

  const downPaymentValue = (propertyValue * downPaymentPercent) / 100;
  const loanAmount = propertyValue - downPaymentValue;
  const totalMonths = years * 12;
  const monthlyRate = annualRate / 12 / 100;

  // SAC Calculation
  const monthlyAmortization = loanAmount / totalMonths;
  const firstInterest = loanAmount * monthlyRate;
  const firstInstallmentSAC = monthlyAmortization + firstInterest;
  const lastInstallmentSAC = monthlyAmortization + (monthlyAmortization * monthlyRate);

  // PRICE Calculation
  const installmentPRICE = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);

  const formatCurrency = (val: number) => {
    return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `*Simulação de Financiamento Imobiliário - HelpUS RealEstate*\n\n` +
      `• Valor do Imóvel: ${formatCurrency(propertyValue)}\n` +
      `• Valor da Entrada (${downPaymentPercent}%): ${formatCurrency(downPaymentValue)}\n` +
      `• Valor Financiado: ${formatCurrency(loanAmount)}\n` +
      `• Prazo: ${years} anos (${totalMonths} meses)\n` +
      `• Sistema: ${system}\n` +
      `• ${system === 'SAC' ? `Primeira Parcela: ${formatCurrency(firstInstallmentSAC)} | Última: ${formatCurrency(lastInstallmentSAC)}` : `Parcela Fixa: ${formatCurrency(installmentPRICE)}`}\n\n` +
      `Gostaria de consultar imóveis compatíveis com este perfil!`
    );
    window.open(`https://wa.me/5583998721848?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-amber-500/40 rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8 space-y-6 text-slate-100 font-sans">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800/60 hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-yellow-500 p-0.5 shadow-lg">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Calculator className="w-6 h-6 text-amber-400" />
            </div>
          </div>
          <div>
            <h2 className="font-bold text-xl sm:text-2xl text-white">
              Simulador de Financiamento Imobiliário
            </h2>
            <p className="text-xs text-slate-400">
              HelpUS RealEstate • realestate.helpusbr.com
            </p>
          </div>
        </div>

        {/* Form Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Valor do Imóvel (R$)</label>
            <input
              type="number"
              step={10000}
              value={propertyValue}
              onChange={(e) => setPropertyValue(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-amber-500 text-sm font-bold text-amber-300 outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Entrada ({downPaymentPercent}%) - {formatCurrency(downPaymentValue)}</label>
            <input
              type="range"
              min={10}
              max={60}
              step={5}
              value={downPaymentPercent}
              onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
              className="w-full accent-amber-400"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Prazo de Financiamento</label>
            <select
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-amber-500 text-xs text-slate-200 outline-none"
            >
              <option value={10}>10 Anos (120 meses)</option>
              <option value={20}>20 Anos (240 meses)</option>
              <option value={30}>30 Anos (360 meses)</option>
              <option value={35}>35 Anos (420 meses)</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Sistema de Amortização</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setSystem('SAC')}
                className={`py-2 rounded-xl text-xs font-bold transition-all ${
                  system === 'SAC' ? 'bg-amber-500 text-slate-950 shadow-md' : 'bg-slate-950 text-slate-400 border border-slate-800'
                }`}
              >
                SAC (Decrescente)
              </button>
              <button
                type="button"
                onClick={() => setSystem('PRICE')}
                className={`py-2 rounded-xl text-xs font-bold transition-all ${
                  system === 'PRICE' ? 'bg-amber-500 text-slate-950 shadow-md' : 'bg-slate-950 text-slate-400 border border-slate-800'
                }`}
              >
                PRICE (Fixa)
              </button>
            </div>
          </div>
        </div>

        {/* Calculation Result Panel */}
        <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/30 space-y-2">
          <div className="flex items-center justify-between text-xs text-amber-200">
            <span>Valor a Financiar:</span>
            <span className="font-mono font-bold text-white text-sm">{formatCurrency(loanAmount)}</span>
          </div>
          
          {system === 'SAC' ? (
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-amber-500/20">
              <div>
                <span className="text-[11px] text-slate-400 block">1ª Parcela (Maior):</span>
                <span className="font-bold text-emerald-400 text-base">{formatCurrency(firstInstallmentSAC)}</span>
              </div>
              <div>
                <span className="text-[11px] text-slate-400 block">Última Parcela (Menor):</span>
                <span className="font-bold text-emerald-400 text-base">{formatCurrency(lastInstallmentSAC)}</span>
              </div>
            </div>
          ) : (
            <div className="pt-2 border-t border-amber-500/20">
              <span className="text-[11px] text-slate-400 block">Parcela Fixa Mensal:</span>
              <span className="font-bold text-emerald-400 text-lg">{formatCurrency(installmentPRICE)}</span>
            </div>
          )}
        </div>

        {/* Send to WhatsApp CTA */}
        <button
          onClick={handleShareWhatsApp}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-lg flex items-center justify-center gap-2 transition-transform hover:scale-[1.01]"
        >
          <Send className="w-4 h-4" />
          <span>Enviar Simulação ao Corretor no WhatsApp</span>
        </button>

      </div>
    </div>
  );
};
