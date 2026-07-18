import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ShoppingCart, Search, Filter } from 'lucide-react';

const Catalog: React.FC = () => {
  const app = useApp();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [feedbackMsg, setFeedbackMsg] = useState<{ id: number; text: string; success: boolean } | null>(null);

  const categories = ['Todas', ...Array.from(new Set(app.products.map(p => p.category)))];

  const handleAddToCart = (id: number) => {
    const res = app.addToCart(id);
    setFeedbackMsg({ id, text: res.message, success: res.success });
    setTimeout(() => {
      setFeedbackMsg(null);
    }, 3000);
  };

  const filteredProducts = app.products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Todas' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="container animate-fade-in" style={{ padding: '3rem 1.5rem 6rem 1.5rem' }}>
      {/* Title Header */}
      <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <h1 className="font-serif text-gradient" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
          Nuestro Catálogo de Ejemplares
        </h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
          Descubre nuestra selecta colección de caballos de carreras. Filtra y encuentra el ejemplar ideal para tus competencias.
        </p>
        <div style={{
          width: '80px',
          height: '4px',
          backgroundColor: '#fbbf24',
          borderRadius: '2px',
          margin: '1.5rem auto 0 auto'
        }} />
      </div>

      {/* Filter and Search Bar */}
      <div className="glass" style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1.5rem',
        padding: '1.5rem',
        borderRadius: 'var(--radius-md)',
        marginBottom: '3rem',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Search */}
        <div style={{ position: 'relative', flex: '1 1 300px' }}>
          <Search size={18} style={{
            position: 'absolute',
            left: '1rem',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--text-secondary)'
          }} />
          <input
            type="text"
            placeholder="Buscar por nombre o descripción..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-control"
            style={{ paddingLeft: '2.75rem', width: '100%' }}
          />
        </div>

        {/* Category Filters */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          flexWrap: 'wrap'
        }}>
          <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Filter size={16} /> Categoría:
          </span>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`btn ${selectedCategory === cat ? 'btn-primary' : 'btn-secondary'}`}
                style={{
                  padding: '0.4rem 1rem',
                  fontSize: '0.85rem',
                  borderRadius: 'var(--radius-full)',
                  textTransform: 'none',
                  letterSpacing: 'normal'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="glass" style={{
          padding: '4rem',
          borderRadius: 'var(--radius-md)',
          textAlign: 'center',
          color: 'var(--text-secondary)'
        }}>
          <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>No se encontraron ejemplares con los criterios seleccionados.</p>
          <button
            onClick={() => { setSearchTerm(''); setSelectedCategory('Todas'); }}
            className="btn btn-secondary"
            style={{ fontSize: '0.85rem' }}
          >
            Restablecer Filtros
          </button>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '2.5rem'
        }}>
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="glass hover-scale"
              style={{
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                boxShadow: 'var(--shadow-md)',
                border: '1px solid rgba(16, 185, 129, 0.1)'
              }}
            >
              {/* Product Image redirects to detail page */}
              <Link to={`/producto/${product.id}`} style={{ position: 'relative', display: 'block', overflow: 'hidden', height: '220px' }}>
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
                {product.offerPrice && (
                  <span className="badge badge-gold" style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    fontSize: '0.75rem',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.5)'
                  }}>
                    OFERTA
                  </span>
                )}
                {product.stock === 0 && (
                  <span className="badge badge-danger" style={{
                    position: 'absolute',
                    top: '1rem',
                    left: '1rem',
                    fontSize: '0.75rem',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.5)'
                  }}>
                    Agotado
                  </span>
                )}
              </Link>

              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1, gap: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', color: '#10b981', letterSpacing: '0.05em' }}>
                    {product.category}
                  </span>
                  <span style={{ fontSize: '0.85rem', color: product.stock > 0 ? '#34d399' : '#f87171', fontWeight: 500 }}>
                    Stock: {product.stock}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.35rem', color: '#ffffff' }}>
                  <Link to={`/producto/${product.id}`} style={{ transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = '#fbbf24'} onMouseOut={(e) => e.currentTarget.style.color = '#ffffff'}>
                    {product.name}
                  </Link>
                </h3>

                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', flexGrow: 1, lineClamp: 3, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {product.description}
                </p>

                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginTop: '0.5rem' }}>
                  {product.offerPrice ? (
                    <>
                      <span style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#fbbf24' }}>
                        {formatPrice(product.offerPrice)}
                      </span>
                      <span style={{ fontSize: '0.9rem', color: '#6b7280', textDecoration: 'line-through' }}>
                        {formatPrice(product.price)}
                      </span>
                    </>
                  ) : (
                    <span style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#ffffff' }}>
                      {formatPrice(product.price)}
                    </span>
                  )}
                </div>

                {/* Feedback Message */}
                {feedbackMsg && feedbackMsg.id === product.id && (
                  <div style={{
                    fontSize: '0.8rem',
                    color: feedbackMsg.success ? '#34d399' : '#f87171',
                    textAlign: 'center',
                    padding: '0.2rem',
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    borderRadius: '4px'
                  }}>
                    {feedbackMsg.text}
                  </div>
                )}

                {/* Add to Cart button */}
                <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={() => handleAddToCart(product.id)}
                    disabled={product.stock <= 0}
                    className="btn btn-primary"
                    style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.6rem' }}
                  >
                    <ShoppingCart size={16} /> Agregar al Carrito
                  </button>
                  <Link
                    to={`/producto/${product.id}`}
                    className="btn btn-secondary"
                    style={{ padding: '0.6rem 1rem' }}
                  >
                    Ver Detalle
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Catalog;
