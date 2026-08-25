'use client';

import { MessageCircle } from 'lucide-react';

export function FloatingWhatsApp() {
  const officialPhone = '5583998721848';
  const whatsappUrl = `https://wa.me/${officialPhone}?text=${encodeURIComponent('Hello HelpUS RealEstate! I would like more information about properties.')}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        background: '#25D366',
        color: '#ffffff',
        width: '56px',
        height: '56px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 10px 25px -5px rgba(37, 211, 102, 0.5), 0 0 0 2px rgba(255, 255, 255, 0.2)',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        textDecoration: 'none',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
      }}
      title="Contact HelpUS via WhatsApp (+55 83 99872-1848)"
    >
      <MessageCircle style={{ width: '28px', height: '28px', fill: '#ffffff', stroke: 'none' }} />
    </a>
  );
}
