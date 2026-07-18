import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Award, Flame, ArrowRight } from 'lucide-react';

const Home: React.FC = () => {
  const { products } = useApp();

  // Get 3 featured products (products that have an offer price or the first 3)
  const featuredProducts = products.filter(p => p.offerPrice !== null).slice(0, 3);
  
  // Fallback if not enough with offer price
  if (featuredProducts.length < 3) {
    featuredProducts.push(...products.filter(p => p.offerPrice === null).slice(0, 3 - featuredProducts.length));
  }

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '4rem' }}>
      {/* Hero Banner */}
      <section style={{
        position: 'relative',
        height: '80vh',
        minHeight: '550px',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(rgba(5, 12, 10, 0.7), rgba(5, 12, 10, 0.9)), url("https://images.unsplash.com/photo-1551887196-72e32bfc7bf3?auto=format&fit=crop&q=80&w=1600") no-repeat center center/cover',
        borderBottom: '1px solid rgba(217, 119, 6, 0.25)',
        boxShadow: 'inset 0 0 100px rgba(0,0,0,0.8)'
      }}>
        <div className="container" style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '1.5rem',
          maxWidth: '800px'
        }}>
          <div className="badge badge-gold" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem' }}>
            <Award size={14} /> CRIADERO DE CAMPEONES
          </div>
          <h1 className="font-serif text-gradient" style={{
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
            fontWeight: 800,
            lineHeight: 1.15
          }}>
            La Cuna de la <span className="text-gold">Velocidad y la Gloria</span>
          </h1>
          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            color: 'var(--text-secondary)',
            lineHeight: 1.6
          }}>
            Adquiere los ejemplares más veloces y con el pedigrí más premiado del continente. En Haras Don Luis criamos campeones de carrera criados con excelencia y pasión.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem' }}>
            <Link to="/catalogo" className="btn btn-gold">
              Ver Catálogo <ArrowRight size={18} />
            </Link>
            <Link to="/contacto" className="btn btn-secondary">
              Contáctanos
            </Link>
          </div>
        </div>
      </section>

      {/* Quiénes Somos */}
      <section style={{ padding: '6rem 0 4rem 0' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '4rem',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#10b981', fontWeight: 600 }}>
                <Flame size={20} /> NUESTRA HISTORIA
              </div>
              <h2 className="font-serif" style={{ fontSize: '2.25rem', color: '#ffffff' }}>
                ¿Quiénes Somos?
              </h2>
              <div style={{ width: '60px', height: '4px', backgroundColor: '#fbbf24', borderRadius: '2px' }} />
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
                Fundada en 2006, <strong>Haras Don Luis</strong> se ha consolidado como el criadero de caballos de carrera más importante de la Región Metropolitana. Nos dedicamos con pasión a la crianza y el entrenamiento de equinos de carreras de élite, destacándonos en disciplinas de velocidad extrema (Cuarto de Milla) y resistencia de fondo (Árabes y Pura Sangres).
              </p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
                Ubicados estratégicamente en la comuna de La Granja, contamos con pistas de entrenamiento de primer nivel y un equipo veterinario altamente especializado. Nuestro compromiso es entregar ejemplares con genética certificada, listos para ganar en cualquier hipódromo nacional o internacional.
              </p>
            </div>

            {/* Features list cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '1.5rem'
            }}>
              <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius-md)', display: 'flex', gap: '1.25rem' }}>
                <div style={{ padding: '0.75rem', background: 'rgba(217, 119, 6, 0.1)', color: '#fbbf24', borderRadius: '50%', display: 'flex', height: 'fit-content' }}>
                  <Award size={24} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Genética Certificada</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Cada caballo cuenta con un árbol genealógico verificado de campeones internacionales de pista.</p>
                </div>
              </div>

              <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius-md)', display: 'flex', gap: '1.25rem' }}>
                <div style={{ padding: '0.75rem', background: 'rgba(16, 185, 129, 0.1)', color: '#34d399', borderRadius: '50%', display: 'flex', height: 'fit-content' }}>
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Salud y Cuidado Premium</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Alimentación óptima, control veterinario diario y entrenamiento guiado por expertos hípicos.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section style={{ padding: '4rem 0' }}>
        <div className="container">
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '3rem',
            flexWrap: 'wrap',
            gap: '1.5rem'
          }}>
            <div>
              <h2 className="font-serif" style={{ fontSize: '2.25rem', color: '#ffffff' }}>
                Ejemplares Destacados
              </h2>
              <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                Nuestras mejores ofertas y caballos más cotizados en promoción especial.
              </p>
            </div>
            <Link to="/catalogo" className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              Ver Catálogo Completo <ArrowRight size={16} />
            </Link>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            {featuredProducts.map((product) => (
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
                {/* Product Image click redirects to detail */}
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
                      OFERTA ESPECIAL
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
                        <span style={{ fontSize: '1.35rem', fontWeight: 'bold', color: '#fbbf24' }}>
                          {formatPrice(product.offerPrice)}
                        </span>
                        <span style={{ fontSize: '0.9rem', color: '#6b7280', textDecoration: 'line-through' }}>
                          {formatPrice(product.price)}
                        </span>
                      </>
                    ) : (
                      <span style={{ fontSize: '1.35rem', fontWeight: 'bold', color: '#ffffff' }}>
                        {formatPrice(product.price)}
                      </span>
                    )}
                  </div>

                  <div style={{ marginTop: '0.5rem' }}>
                    <Link to={`/producto/${product.id}`} className="btn btn-secondary" style={{ width: '100%', fontSize: '0.85rem' }}>
                      Ver Detalles
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
