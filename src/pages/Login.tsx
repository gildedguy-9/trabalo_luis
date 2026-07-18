import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Mail, Lock, LogIn, AlertCircle } from 'lucide-react';

const Login: React.FC = () => {
  const { login, blockedAccounts } = useApp();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const emailTrim = email.trim().toLowerCase();
    if (!emailTrim || !password) {
      setErrorMsg('Por favor completa todos los campos.');
      return;
    }

    const res = login(emailTrim, password);

    if (res.success) {
      setSuccess(true);
      setTimeout(() => {
        navigate('/catalogo');
      }, 1500);
    } else {
      setErrorMsg(res.message);
    }
  };

  const isBlocked = blockedAccounts.includes(email.trim().toLowerCase());

  return (
    <div className="container animate-fade-in" style={{ padding: '5rem 1.5rem 6rem 1.5rem', display: 'flex', justifyContent: 'center' }}>
      <div className="glass" style={{
        width: '100%',
        maxWidth: '450px',
        padding: '2.5rem',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-lg)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 className="font-serif text-gradient" style={{ fontSize: '2.25rem', marginBottom: '0.5rem' }}>
            Iniciar Sesión
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Ingresa a tu cuenta para continuar con tu compra.
          </p>
        </div>

        {success && (
          <div className="alert alert-success" style={{ marginBottom: '1.5rem' }}>
            <LogIn size={20} />
            <div>
              <strong>¡Inicio de sesión exitoso!</strong> Redirigiendo al catálogo...
            </div>
          </div>
        )}

        {errorMsg && (
          <div className="alert alert-error" style={{ marginBottom: '1.5rem' }}>
            <AlertCircle size={20} style={{ flexShrink: 0 }} />
            <div>{errorMsg}</div>
          </div>
        )}

        {isBlocked && (
          <div className="alert alert-warning" style={{ marginBottom: '1.5rem' }}>
            <AlertCircle size={20} style={{ flexShrink: 0 }} />
            <div>
              <strong>Cuenta Bloqueada:</strong> Este correo electrónico está bloqueado debido a 3 intentos fallidos de contraseña.
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {/* Email */}
          <div className="form-group">
            <label className="form-label" htmlFor="login-email">Correo Electrónico</label>
            <div style={{ position: 'relative' }}>
              <input
                type="email"
                id="login-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                placeholder="usuario@correo.com"
                style={{ paddingLeft: '2.5rem' }}
                disabled={success}
              />
              <Mail size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
            </div>
          </div>

          {/* Password */}
          <div className="form-group" style={{ marginBottom: '1.75rem' }}>
            <label className="form-label" htmlFor="login-pass">Contraseña</label>
            <div style={{ position: 'relative' }}>
              <input
                type="password"
                id="login-pass"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                placeholder="Ingresa tu contraseña"
                style={{ paddingLeft: '2.5rem' }}
                disabled={success}
              />
              <Lock size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', padding: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
            disabled={success || isBlocked}
          >
            <LogIn size={16} /> Entrar
          </button>
        </form>

        <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          ¿No tienes una cuenta?{' '}
          <Link to="/registro" style={{ color: '#34d399', fontWeight: 600 }}>
            Regístrate aquí
          </Link>
        </div>

        {/* Informative Tip for Testing JSONPlaceholder preloaded users */}
        <div className="glass" style={{
          marginTop: '2rem',
          padding: '1rem',
          borderRadius: 'var(--radius-md)',
          fontSize: '0.8rem',
          color: 'var(--text-secondary)',
          border: '1px dashed rgba(217, 119, 6, 0.3)'
        }}>
          💡 <strong>Tip de Evaluación:</strong> Se cargaron 3 usuarios de la API JSONPlaceholder en el sistema. Puedes usar sus correos para probar (ej. el correo del primer usuario con contraseña <strong>Inacap123</strong>).
        </div>
      </div>
    </div>
  );
};

export default Login;
