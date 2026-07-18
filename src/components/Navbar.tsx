import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ShoppingCart, LogOut, LogIn, UserPlus, Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const { currentUser, cart, logout } = useApp();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    navigate('/');
  };

  const navItems = [
    { name: 'Inicio', path: '/' },
    { name: 'Catálogo', path: '/catalogo' },
    { name: 'Contacto', path: '/contacto' }
  ];

  return (
    <nav className="glass" style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      borderBottom: '1px solid rgba(16, 185, 129, 0.1)',
      backgroundColor: 'rgba(5, 12, 10, 0.85)'
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'between',
        alignItems: 'center',
        height: '75px'
      }}>
        {/* Logo */}
        <Link to="/" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '1.4rem',
          fontWeight: 800,
          letterSpacing: '0.05em',
          color: '#fbbf24',
          fontFamily: 'var(--font-serif)'
        }}>
          <span>🐎</span> HARAS DON LUIS
        </Link>

        {/* Desktop Navigation Links */}
        <div className="desktop-menu" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1.5rem'
        }}>
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              style={({ isActive }) => ({
                fontWeight: 600,
                fontSize: '0.95rem',
                color: isActive ? '#34d399' : '#d1d5db',
                borderBottom: isActive ? '2px solid #10b981' : '2px solid transparent',
                padding: '0.5rem 0',
                transition: 'color 0.2s'
              })}
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        {/* Auth & Cart Controls */}
        <div className="desktop-menu" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}>
          {/* Cart Icon (Always visible) */}
          <Link
            to="/carrito"
            style={{
              position: 'relative',
              padding: '0.5rem',
              color: '#d1d5db',
              display: 'flex',
              alignItems: 'center',
              transition: 'color 0.2s'
            }}
            title="Carrito de Compras"
          >
            <ShoppingCart size={22} />
            {cartItemsCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-2px',
                right: '-2px',
                background: 'linear-gradient(135deg, #fbbf24 0%, #d97706 100%)',
                color: '#050c0a',
                fontSize: '0.75rem',
                fontWeight: 'bold',
                borderRadius: '50%',
                width: '18px',
                height: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 5px rgba(0,0,0,0.5)'
              }}>
                {cartItemsCount}
              </span>
            )}
          </Link>

          {/* Separation bar */}
          <div style={{ width: '1px', height: '24px', backgroundColor: 'rgba(255,255,255,0.1)' }} />

          {/* User Auth */}
          {currentUser ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontSize: '0.9rem', color: '#9ca3af' }}>
                Hola, <strong style={{ color: '#fbbf24' }}>{currentUser.name}</strong>
              </span>
              <button
                onClick={handleLogout}
                className="btn btn-secondary"
                style={{
                  padding: '0.4rem 0.8rem',
                  fontSize: '0.8rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem'
                }}
              >
                <LogOut size={14} /> Cerrar Sesión
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Link
                to="/login"
                className="btn btn-secondary"
                style={{
                  padding: '0.4rem 0.8rem',
                  fontSize: '0.8rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem'
                }}
              >
                <LogIn size={14} /> Iniciar Sesión
              </Link>
              <Link
                to="/registro"
                className="btn btn-primary"
                style={{
                  padding: '0.4rem 0.8rem',
                  fontSize: '0.8rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem'
                }}
              >
                <UserPlus size={14} /> Registrarse
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu toggle */}
        <button
          className="mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            background: 'none',
            border: 'none',
            color: '#d1d5db',
            cursor: 'pointer',
            padding: '0.5rem',
            display: 'none'
          }}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="glass" style={{
          position: 'absolute',
          top: '75px',
          left: 0,
          width: '100%',
          borderBottom: '1px solid rgba(16, 185, 129, 0.15)',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
          backgroundColor: 'rgba(5, 12, 10, 0.98)'
        }}>
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              style={({ isActive }) => ({
                fontWeight: 600,
                fontSize: '1.05rem',
                color: isActive ? '#34d399' : '#d1d5db',
                padding: '0.25rem 0'
              })}
            >
              {item.name}
            </NavLink>
          ))}
          
          <div style={{ height: '1px', backgroundColor: 'rgba(255,255,255,0.1)' }} />
          
          {currentUser ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <span style={{ fontSize: '0.95rem', color: '#9ca3af' }}>
                Hola, <strong style={{ color: '#fbbf24' }}>{currentUser.name}</strong>
              </span>
              <button
                onClick={handleLogout}
                className="btn btn-secondary"
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
              >
                <LogOut size={16} /> Cerrar Sesión
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="btn btn-secondary"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
              >
                <LogIn size={16} /> Iniciar Sesión
              </Link>
              <Link
                to="/registro"
                onClick={() => setMobileMenuOpen(false)}
                className="btn btn-primary"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
              >
                <UserPlus size={16} /> Registrarse
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Injection of styles for media query responsiveness */}
      <style>{`
        .container {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        @media (max-width: 768px) {
          .desktop-menu {
            display: none !important;
          }
          .mobile-toggle {
            display: block !important;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
