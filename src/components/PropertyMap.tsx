'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import L from 'leaflet';

interface PropertyMapProps {
  properties: Array<{
    id: string;
    title: string;
    slug: string;
    price: number;
    neighborhood: string;
    city: string;
    bedrooms: number;
    suites: number;
    parkingSpaces: number;
    areaTotal: number;
    images: string;
    latitude?: number | null;
    longitude?: number | null;
  }>;
  center?: [number, number];
  zoom?: number;
  singleMode?: boolean;
}

export default function PropertyMap({
  properties,
  center = [-7.1189, -34.8260],
  zoom = 12,
  singleMode = false,
}: PropertyMapProps) {
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    setMapLoaded(true);
  }, []);

  if (!mapLoaded) {
    return (
      <div className="w-full h-full min-h-[420px] bg-slate-100 rounded-3xl border border-slate-200 flex items-center justify-center text-slate-500 text-xs font-bold animate-pulse">
        Carregando Mapa Interativo...
      </div>
    );
  }

  const formatShortPrice = (val: number) => {
    if (val >= 1000000) {
      return `R$ ${(val / 1000000).toFixed(2).replace('.', ',')} Mi`;
    } else if (val >= 1000) {
      return `R$ ${(val / 1000).toFixed(0)} Mil`;
    }
    return `R$ ${val}`;
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="w-full h-full min-h-[460px] rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-xl relative z-0">
      <MapContainerWrapper
        properties={properties}
        center={center}
        zoom={zoom}
        formatShortPrice={formatShortPrice}
        formatCurrency={formatCurrency}
        singleMode={singleMode}
      />
    </div>
  );
}

function MapContainerWrapper({
  properties,
  center,
  zoom,
  formatShortPrice,
  formatCurrency,
  singleMode,
}: {
  properties: any[];
  center: [number, number];
  zoom: number;
  formatShortPrice: (v: number) => string;
  formatCurrency: (v: number) => string;
  singleMode: boolean;
}) {
  const { MapContainer, TileLayer, Marker, Popup } = require('react-leaflet');

  const validProperties = properties.filter(
    (p) => typeof p.latitude === 'number' && typeof p.longitude === 'number'
  );

  const initialCenter = singleMode && validProperties.length > 0
    ? [validProperties[0].latitude, validProperties[0].longitude] as [number, number]
    : center;

  return (
    <MapContainer
      center={initialCenter}
      zoom={singleMode ? 15 : zoom}
      scrollWheelZoom={true}
      style={{ width: '100%', height: '100%', minHeight: singleMode ? '380px' : '480px' }}
      className="z-0 rounded-3xl"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {validProperties.map((prop) => {
        let imageList: string[] = [];
        try {
          imageList = JSON.parse(prop.images || '[]');
        } catch {
          imageList = [];
        }
        const mainImage = imageList[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80';

        const customIcon = L.divIcon({
          className: 'custom-price-marker-container',
          html: `<div style="background: #2563eb; color: #ffffff; font-weight: 800; font-size: 11px; padding: 4px 8px; border-radius: 20px; box-shadow: 0 4px 12px rgba(37,99,235,0.4); border: 2px solid #ffffff; white-space: nowrap; text-align: center;">${formatShortPrice(prop.price)}</div>`,
          iconSize: [90, 30],
          iconAnchor: [45, 15],
        });

        return (
          <Marker
            key={prop.id}
            position={[prop.latitude, prop.longitude]}
            icon={customIcon}
          >
            <Popup className="light-map-popup">
              <div className="w-60 p-2.5 space-y-2 bg-white text-slate-900 rounded-2xl shadow-xl border border-slate-100 font-sans">
                <div className="aspect-[16/10] rounded-xl overflow-hidden relative bg-slate-100">
                  <img src={mainImage} alt={prop.title} className="w-full h-full object-cover" />
                  <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-lg bg-slate-900/90 text-white font-extrabold text-xs shadow">
                    {formatCurrency(prop.price)}
                  </div>
                </div>

                <div>
                  <p className="text-[10px] text-blue-600 font-bold uppercase tracking-wider">{prop.neighborhood}, {prop.city}</p>
                  <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{prop.title}</h4>
                </div>

                <div className="flex items-center justify-between text-[10px] font-semibold text-slate-600 pt-1.5 border-t border-slate-100">
                  <span>{prop.bedrooms} Qts • {prop.suites} Stes • {prop.areaTotal}m²</span>
                </div>

                <Link
                  href={`/imoveis/${prop.slug}`}
                  className="block w-full py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-[11px] text-center shadow-sm shadow-blue-600/30 transition-all"
                >
                  Ver Fotos e Detalhes →
                </Link>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
