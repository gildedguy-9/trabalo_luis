import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ShoppingCart, ArrowLeft, ShieldCheck, Heart, Award } from 'lucide-react';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const app = useApp();

  const product = app.products.find((p) => p.id === Number(id));
  const [feedback, setFeedback] = useState<{ text: string; success: boolean } | null>(null);

  if (!product) {
    return (
      <div className="container" style={{ padding: '6rem 1.5rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Caballo no encontrado</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>El ejemplar que buscas no existe o ha sido retirado.</p>
        <Link to="/catalogo" className="btn btn-primary">Volver al Catálogo</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    const res = app.addToCart(product.id);
    setFeedback({ text: res.message, success: res.success });
    setTimeout(() => {
      setFeedback(null);
    }, 3000);
  };

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="container animate-fade-in" style={{ padding: '3rem 1.5rem 6rem 1.5rem' }}>
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        style={{
          background: 'none',
          border: 'none',
          color: 'var(--text-secondary)',
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontWeight: 600,
          marginBottom: '2.5rem',
          transition: 'color 0.2s'
        }}
        onMouseOver={(e) => e.currentTarget.style.color = '#34d399'}
        onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
      >
        <ArrowLeft size={18} /> Volver
      </button>

      {/* Main product showcase */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '4rem',
        alignItems: 'start'
      }}>
        {/* Left Column: Image */}
        <div style={{
          position: 'relative',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-lg)',
          border: '1px solid rgba(16, 185, 129, 0.15)',
          height: '450px'
        }}>
          <img
            src={product.image}
            alt={product.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
          {product.offerPrice && (
            <span className="badge badge-gold" style={{
              position: 'absolute',
              top: '1.5rem',
              right: '1.5rem',
              fontSize: '0.85rem',
              boxShadow: '0 2px 10px rgba(0,0,0,0.5)',
              padding: '0.4rem 1rem'
            }}>
              OFERTA ESPECIAL
            </span>
          )}
          {product.stock === 0 && (
            <span className="badge badge-danger" style={{
              position: 'absolute',
              top: '1.5rem',
              left: '1.5rem',
              fontSize: '0.85rem',
              boxShadow: '0 2px 10px rgba(0,0,0,0.5)',
              padding: '0.4rem 1rem'
            }}>
              Agotado
            </span>
          )}
        </div>

        {/* Right Column: Info & Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Header */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span className="badge badge-green" style={{ fontSize: '0.8rem' }}>
                {product.category}
              </span>
              <span style={{
                fontSize: '0.9rem',
                fontWeight: 500,
                color: product.stock > 0 ? '#34d399' : '#f87171'
              }}>
                Disponibilidad: {product.stock > 0 ? `${product.stock} unidades en stock` : 'Sin stock'}
              </span>
            </div>
            <h1 className="font-serif" style={{ fontSize: '2.75rem', color: '#ffffff', lineHeight: 1.15 }}>
              {product.name}
            </h1>
          </div>

          {/* Pricing */}
          <div className="glass" style={{
            padding: '1.5rem',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            alignItems: 'baseline',
            gap: '1rem',
            border: '1px solid rgba(217, 119, 6, 0.2)'
          }}>
            {product.offerPrice ? (
              <>
                <span style={{ fontSize: '2rem', fontWeight: 800, color: '#fbbf24' }}>
                  {formatPrice(product.offerPrice)}
                </span>
                <span style={{ fontSize: '1.2rem', color: '#6b7280', textDecoration: 'line-through' }}>
                  {formatPrice(product.price)}
                </span>
                <span className="badge badge-gold" style={{ fontSize: '0.75rem', marginLeft: 'auto' }}>
                  Ahorras {formatPrice(product.price - product.offerPrice)}
                </span>
              </>
            ) : (
              <span style={{ fontSize: '2rem', fontWeight: 800, color: '#ffffff' }}>
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          {/* Pedigree & Description */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <h3 style={{ fontSize: '1.2rem', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Award size={18} style={{ color: '#fbbf24' }} /> Pedigrí e Información
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.7 }}>
              {product.description}
            </p>
          </div>

          <div style={{ height: '1px', backgroundColor: 'rgba(255,255,255,0.08)' }} />

          {/* Specific racing guarantees */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', fontSize: '0.9rem', color: '#9ca3af' }}>
              <ShieldCheck size={18} style={{ color: '#10b981' }} />
              <span>Exámenes Clínicos al Día</span>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', fontSize: '0.9rem', color: '#9ca3af' }}>
              <Heart size={18} style={{ color: '#ef4444' }} />
              <span>Certificado de Pedigrí S.J.C.</span>
            </div>
          </div>

          {/* Feedback message */}
          {feedback && (
            <div className={`alert ${feedback.success ? 'alert-success' : 'alert-error'}`} style={{ margin: '0' }}>
              {feedback.text}
            </div>
          )}

          {/* Button actions */}
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
              className="btn btn-primary"
              style={{
                flex: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '1rem'
              }}
            >
              <ShoppingCart size={20} /> Agregar al Carrito
            </button>
            <Link
              to="/catalogo"
              className="btn btn-secondary"
              style={{ flex: 1, padding: '1rem' }}
            >
              Volver
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
