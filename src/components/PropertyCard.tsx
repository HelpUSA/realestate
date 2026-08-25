'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Heart, BedDouble, Bath, Car, Maximize2, MapPin, ChevronLeft, ChevronRight, ShieldCheck } from 'lucide-react';
import { translations, getLang, Language } from '@/lib/i18n';

interface PropertyCardProps {
  property: {
    id: string;
    title: string;
    slug: string;
    price: number;
    rentPrice?: number | null;
    transactionType: string;
    propertyType: string;
    neighborhood: string;
    city: string;
    bedrooms: number;
    bathrooms: number;
    suites: number;
    parkingSpaces: number;
    areaTotal: number;
    featured: boolean;
    images: string; // JSON string
    videoUrl?: string | null;
    realtor: {
      id: string;
      name: string;
      creci?: string | null;
      whatsapp?: string | null;
      avatarUrl?: string | null;
      agencyName?: string | null;
    };
  };
  isFavoriteInitial?: boolean;
  onFavoriteToggle?: () => void;
}

export default function PropertyCard({ property, isFavoriteInitial = false, onFavoriteToggle }: PropertyCardProps) {
  const [isFavorite, setIsFavorite] = useState(isFavoriteInitial);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
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

  let imageList: string[] = [];
  try {
    imageList = JSON.parse(property.images || '[]');
  } catch {
    imageList = [];
  }

  if (imageList.length === 0) {
    imageList = ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80'];
  }

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const res = await fetch('/api/portal/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ propertyId: property.id }),
      });

      if (res.ok) {
        const data = await res.json();
        setIsFavorite(data.isFavorite);
        if (onFavoriteToggle) onFavoriteToggle();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % imageList.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + imageList.length) % imageList.length);
  };

  const formatCurrency = (val: number) => {
    if (lang === 'en') {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
    }
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="group bg-slate-900/90 rounded-3xl overflow-hidden border border-slate-800 hover:border-blue-500/40 transition-all shadow-xl flex flex-col h-full">
      {/* Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
        <img
          src={imageList[currentImageIndex]}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-black/40 pointer-events-none"></div>

        {/* Transaction Badge Top Left */}
        <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-blue-600/90 text-white font-bold text-xs uppercase tracking-wider shadow-md backdrop-blur-md">
            {property.transactionType === 'SALE' ? t.hero.sale : property.transactionType === 'RENT' ? t.hero.rent : t.hero.allTransactions}
          </span>
          {property.featured && (
            <span className="px-2.5 py-1 rounded-full bg-amber-500/90 text-slate-950 font-extrabold text-[10px] uppercase tracking-wider shadow">
              VIP
            </span>
          )}
        </div>

        {/* Favorite Button Top Right */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 z-10 p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-900 text-slate-300 border border-slate-700 hover:text-amber-400 transition-all shadow"
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-amber-400 text-amber-400' : ''}`} />
        </button>

        {/* Carousel Navigation Arrows */}
        {imageList.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 hover:bg-black/80 transition-opacity"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 hover:bg-black/80 transition-opacity"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}

        {/* Price Tag Overlay Bottom Left */}
        <div className="absolute bottom-3 left-3 z-10">
          <p className="text-xl font-extrabold text-white font-sans drop-shadow-md">
            {formatCurrency(property.price)}
            {property.transactionType === 'RENT' && <span className="text-xs font-normal text-slate-300"> / mo</span>}
          </p>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Location */}
          <div className="flex items-center gap-1.5 text-xs text-blue-400 font-medium mb-1.5">
            <MapPin className="w-3.5 h-3.5 shrink-0 text-blue-400" />
            <span className="truncate">{property.neighborhood}, {property.city}</span>
          </div>

          {/* Title */}
          <Link href={`/imoveis/${property.slug}`}>
            <h3 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors line-clamp-2 leading-snug">
              {property.title}
            </h3>
          </Link>
        </div>

        {/* Specs Icons Grid */}
        <div className="grid grid-cols-4 gap-2 pt-3 border-t border-slate-800/80 text-slate-300 text-xs font-medium text-center">
          <div className="flex flex-col items-center gap-0.5 p-1.5 rounded-xl bg-slate-950">
            <BedDouble className="w-4 h-4 text-blue-400" />
            <span>{property.bedrooms} {t.featured.bedrooms}</span>
          </div>
          <div className="flex flex-col items-center gap-0.5 p-1.5 rounded-xl bg-slate-950">
            <Bath className="w-4 h-4 text-blue-400" />
            <span>{property.suites} {t.featured.bathrooms}</span>
          </div>
          <div className="flex flex-col items-center gap-0.5 p-1.5 rounded-xl bg-slate-950">
            <Car className="w-4 h-4 text-blue-400" />
            <span>{property.parkingSpaces}</span>
          </div>
          <div className="flex flex-col items-center gap-0.5 p-1.5 rounded-xl bg-slate-950">
            <Maximize2 className="w-4 h-4 text-blue-400" />
            <span>{property.areaTotal}m²</span>
          </div>
        </div>

        {/* Realtor Footer Badge */}
        <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
          <Link href={`/corretores/${property.realtor.id}`} className="flex items-center gap-2 group/realtor">
            <div className="w-7 h-7 rounded-full bg-blue-600/20 border border-blue-400/50 flex items-center justify-center text-blue-300 text-xs font-bold overflow-hidden shrink-0">
              {property.realtor.avatarUrl ? (
                <img src={property.realtor.avatarUrl} alt={property.realtor.name} className="w-full h-full object-cover" />
              ) : (
                property.realtor.name.charAt(0)
              )}
            </div>
            <div className="text-left">
              <p className="text-xs font-semibold text-slate-200 group-hover/realtor:text-blue-400 transition-colors truncate max-w-[130px]">
                {property.realtor.agencyName || property.realtor.name}
              </p>
              <p className="text-[10px] text-slate-400 font-mono flex items-center gap-0.5">
                <ShieldCheck className="w-2.5 h-2.5 text-blue-400" />
                {property.realtor.creci || 'Verified Agent'}
              </p>
            </div>
          </Link>

          <Link
            href={`/imoveis/${property.slug}`}
            className="px-3 py-1.5 rounded-xl bg-blue-600/10 hover:bg-blue-600 text-blue-300 hover:text-white font-bold text-xs transition-all border border-blue-500/30"
          >
            {t.featured.viewDetails}
          </Link>
        </div>
      </div>
    </div>
  );
}
