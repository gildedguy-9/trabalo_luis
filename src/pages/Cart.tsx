import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ShoppingBag, Trash2, ArrowLeft, Plus, Minus, CreditCard, Gift } from 'lucide-react';

const Cart: React.FC = () => {
  const { currentUser, cart, confirmPurchase, resetStockAndClearCart, updateCartQuantity, removeFromCart } = useApp();
  const navigate = useNavigate();

  // If not logged in, redirect or display a landing asking to log in.
  // Pauta: "Solo podrán realizar compras los usuarios que hayan iniciado sesión."
  // It's cleaner to show a beautiful unauthenticated screen within the cart route.
  if (!currentUser) {
    return (
      <div className="container animate-fade-in" style={{ padding: '6rem 1.5rem', textAlign: 'center', maxWidth: '600px' }}>
        <div className="glass" style={{ padding: '3.5rem 2rem', borderRadius: 'var(--radius-lg)' }}>
          <div style={{
            fontSize: '3rem',
            color: '#fbbf24',
            marginBottom: '1.5rem',
            display: 'inline-flex',
            padding: '1rem',
            backgroundColor: 'rgba(217, 119, 6, 0.1)',
            borderRadius: '50%'
          }}>
            <ShoppingBag size={48} />
          </div>
          <h2 className="font-serif" style={{ fontSize: '2rem', marginBottom: '1rem', color: '#ffffff' }}>
            Acceso Restringido
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Debes iniciar sesión con tu cuenta para visualizar tu carrito de compras y concretar la adquisición de nuestros ejemplares hípicos.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link to="/login" className="btn btn-primary" style={{ padding: '0.75rem 1.5rem' }}>
              Iniciar Sesión
            </Link>
            <Link to="/registro" className="btn btn-secondary" style={{ padding: '0.75rem 1.5rem' }}>
              Registrarse
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Check if today is the user's birthday
  const today = new Date();
  const birth = new Date(currentUser.dob);
  // Add UTC offset correction if necessary, but standard local Month and Date is fine
  const isBirthday = today.getMonth() === birth.getMonth() && today.getDate() === birth.getDate();

  // Calculate subtotal
  const subtotal = cart.reduce((sum, item) => {
    const price = item.product.offerPrice !== null ? item.product.offerPrice : item.product.price;
    return sum + (price * item.quantity);
  }, 0);

  // Apply birthday discount of 10%
  const discount = isBirthday ? subtotal * 0.10 : 0;
  const total = subtotal - discount;

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0
    }).format(value);
  };

  const handleConfirmPurchase = () => {
    const res = confirmPurchase();
    if (res.success) {
      alert(res.message);
      navigate('/catalogo');
    } else {
      alert(res.message);
    }
  };

  return (
    <div className="container animate-fade-in" style={{ padding: '3rem 1.5rem 6rem 1.5rem' }}>
      {/* Title */}
      <div style={{ marginBottom: '3rem' }}>
        <h1 className="font-serif text-gradient" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
          Tu Carrito de Compras
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Gestiona los ejemplares seleccionados y confirma tu compra.
        </p>
        <div style={{ width: '60px', height: '4px', backgroundColor: '#fbbf24', borderRadius: '2px', marginTop: '1rem' }} />
      </div>

      {cart.length === 0 ? (
        <div className="glass" style={{
          padding: '5rem 2rem',
          borderRadius: 'var(--radius-lg)',
          textAlign: 'center',
          border: '1px dashed rgba(16, 185, 129, 0.2)'
        }}>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
            Aún no has agregado ningún caballo a tu carrito.
          </p>
          <Link to="/catalogo" className="btn btn-primary">
            Explorar Catálogo
          </Link>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: '3fr 2fr',
          gap: '2.5rem',
          alignItems: 'start'
        }}>
          {/* Left Column: Items List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {cart.map((item) => {
              const activePrice = item.product.offerPrice !== null ? item.product.offerPrice : item.product.price;
              const hasOffer = item.product.offerPrice !== null;
              
              return (
                <div
                  key={item.product.id}
                  className="glass"
                  style={{
                    display: 'flex',
                    gap: '1.5rem',
                    padding: '1.25rem',
                    borderRadius: 'var(--radius-md)',
                    alignItems: 'center',
                    border: '1px solid rgba(16, 185, 129, 0.1)'
                  }}
                >
                  {/* Horse image */}
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    style={{
                      width: '100px',
                      height: '100px',
                      objectFit: 'cover',
                      borderRadius: 'var(--radius-sm)',
                      flexShrink: 0
                    }}
                  />

                  {/* Horse details */}
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#10b981', fontWeight: 600 }}>
                      {item.product.category}
                    </span>
                    <h3 style={{ fontSize: '1.15rem', color: '#ffffff' }}>
                      <Link to={`/producto/${item.product.id}`} style={{ transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = '#fbbf24'} onMouseOut={(e) => e.currentTarget.style.color = '#ffffff'}>
                        {item.product.name}
                      </Link>
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                      <span style={{ fontWeight: 'bold', color: '#fbbf24', fontSize: '1.05rem' }}>
                        {formatPrice(activePrice)}
                      </span>
                      {hasOffer && (
                        <span style={{ fontSize: '0.8rem', color: '#6b7280', textDecoration: 'line-through' }}>
                          {formatPrice(item.product.price)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Quantity controls */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <button
                      onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className="btn btn-secondary"
                      style={{ padding: '0.35rem', borderRadius: '50%', display: 'flex', height: 'fit-content' }}
                    >
                      <Minus size={14} />
                    </button>
                    <span style={{ width: '20px', textAlign: 'center', fontWeight: 'bold' }}>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                      disabled={item.product.stock <= 0}
                      className="btn btn-secondary"
                      style={{ padding: '0.35rem', borderRadius: '50%', display: 'flex', height: 'fit-content' }}
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  {/* Delete button */}
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="btn btn-secondary"
                    style={{
                      padding: '0.5rem',
                      borderColor: 'rgba(239, 68, 68, 0.2)',
                      color: 'var(--color-danger-hover)'
                    }}
                    title="Eliminar del carrito"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              );
            })}

            {/* Clear Cart Button */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem' }}>
              <Link to="/catalogo" className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textTransform: 'none' }}>
                <ArrowLeft size={16} /> Seguir Comprando
              </Link>
              <button
                onClick={resetStockAndClearCart}
                className="btn btn-danger"
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textTransform: 'none' }}
              >
                <Trash2 size={16} /> Vaciar Carrito
              </button>
            </div>
          </div>

          {/* Right Column: Checkout Summary */}
          <div className="glass" style={{
            padding: '2rem',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid rgba(217, 119, 6, 0.25)',
            boxShadow: 'var(--shadow-lg)'
          }}>
            <h2 className="font-serif" style={{ fontSize: '1.6rem', marginBottom: '1.5rem', color: '#ffffff' }}>
              Resumen de Compra
            </h2>

            {/* Birthday Promo Banner */}
            {isBirthday ? (
              <div className="alert alert-success" style={{ padding: '0.75rem 1rem', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                <Gift size={20} style={{ color: '#fbbf24', flexShrink: 0 }} />
                <div>
                  <strong>¡Feliz Cumpleaños! 🎉</strong> Se aplicó un 10% de descuento en el total de tu compra.
                </div>
              </div>
            ) : (
              <div className="glass" style={{
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                marginBottom: '1.5rem',
                fontSize: '0.8rem',
                color: 'var(--text-secondary)',
                border: '1px dashed rgba(255,255,255,0.1)'
              }}>
                💡 <strong>Dato:</strong> Si es el día de tu cumpleaños, obtendrás un 10% de descuento automático en tu compra.
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              
              {isBirthday && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#fbbf24', fontWeight: 500 }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Gift size={14} /> Descuento (10%)</span>
                  <span>-{formatPrice(discount)}</span>
                </div>
              )}

              <div style={{ height: '1px', backgroundColor: 'rgba(255,255,255,0.1)', margin: '0.5rem 0' }} />

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.4rem', fontWeight: 'bold', color: '#ffffff' }}>
                <span>Total</span>
                <span className="text-gold" style={{ WebkitTextFillColor: 'initial' }}>{formatPrice(total)}</span>
              </div>

              <button
                onClick={handleConfirmPurchase}
                className="btn btn-gold"
                style={{
                  width: '100%',
                  marginTop: '1.5rem',
                  padding: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}
              >
                <CreditCard size={18} /> Confirmar Compra
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Styled inject for media query layout */}
      <style>{`
        @media (max-width: 900px) {
          div[style*="grid-template-columns: 3fr 2fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Cart;
