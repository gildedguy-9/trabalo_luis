import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer style={{
      background: 'linear-gradient(180deg, #0b1a15 0%, #030806 100%)',
      borderTop: '1px solid rgba(217, 119, 6, 0.2)',
      padding: '2.5rem 0 2rem 0',
      color: '#9ca3af',
      marginTop: 'auto'
    }}>
      <div className="container" style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
        textAlign: 'center'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          color: '#fbbf24',
          fontFamily: 'var(--font-serif)',
          fontSize: '1.25rem',
          fontWeight: 'bold',
          letterSpacing: '0.05em'
        }}>
          🐎 HARAS DON LUIS
        </div>
        <p style={{
          fontSize: '0.85rem',
          color: '#6b7280',
          maxWidth: '600px'
        }}>
          Crianza y venta de caballos de carreras de élite. Genética comprobada y campeones de pista para las competencias más exigentes del continente.
        </p>
        <div style={{
          height: '1px',
          width: '100%',
          maxWidth: '300px',
          background: 'linear-gradient(90deg, transparent, rgba(217, 119, 6, 0.3), transparent)',
          margin: '0.5rem 0'
        }} />
        <p style={{
          fontSize: '0.9rem',
          fontWeight: '500',
          color: '#e5e7eb',
          letterSpacing: '0.02em'
        }}>
          Luis Espinoza | TI3V31 | Cristian Eduardo Acuña Sandoval | Programacion Front End | ©2026
        </p>
      </div>
    </footer>
  );
};

export default Footer;
