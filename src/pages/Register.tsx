import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { User, Mail, Calendar, Lock, ShieldCheck, CheckCircle } from 'lucide-react';

const Register: React.FC = () => {
  const { registerUser } = useApp();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    // Name validation
    if (!name.trim()) newErrors.name = 'El nombre es obligatorio.';

    // Email validation
    const emailLower = email.toLowerCase().trim();
    if (!emailLower) {
      newErrors.email = 'El correo electrónico es obligatorio.';
    } else {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailPattern.test(emailLower)) {
        newErrors.email = 'El formato del correo electrónico es inválido.';
      } else {
        const domainMatch = emailLower.match(/@(gmail\.com|inacap\.cl)$/);
        if (!domainMatch) {
          newErrors.email = 'Solo se aceptan correos con dominios @gmail.com o @inacap.cl.';
        }
      }
    }

    // DOB / Age validation
    if (!dob) {
      newErrors.dob = 'La fecha de nacimiento es obligatoria.';
    } else {
      const today = new Date();
      const birthDate = new Date(dob);
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      if (age < 18) {
        newErrors.dob = 'Debes ser mayor de 18 años para poder registrarte.';
      }
    }

    // Password validation
    if (!password) {
      newErrors.password = 'La contraseña es obligatoria.';
    } else {
      if (password.length < 8) {
        newErrors.password = 'La contraseña debe tener mínimo 8 caracteres.';
      } else {
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        if (!hasUppercase || !hasLowercase || !hasNumber || !hasSpecial) {
          newErrors.password = 'La contraseña debe incluir al menos una letra mayúscula, una letra minúscula, un número y un carácter especial (!@#$%^&*...).';
        }
      }
    }

    // Repeat Password validation
    if (!repeatPassword) {
      newErrors.repeatPassword = 'Debe repetir la contraseña.';
    } else if (password !== repeatPassword) {
      newErrors.repeatPassword = 'Las contraseñas no coinciden.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);

    if (validate()) {
      const res = registerUser({
        name,
        email: email.trim().toLowerCase(),
        dob,
        password,
      });

      if (res.success) {
        setSuccess(true);
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setApiError(res.message);
      }
    }
  };

  return (
    <div className="container animate-fade-in" style={{ padding: '4rem 1.5rem 6rem 1.5rem', display: 'flex', justifyContent: 'center' }}>
      <div className="glass" style={{
        width: '100%',
        maxWidth: '500px',
        padding: '2.5rem',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-lg)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 className="font-serif text-gradient" style={{ fontSize: '2.25rem', marginBottom: '0.5rem' }}>
            Registrar Cuenta
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Únete a Haras Don Luis para adquirir ejemplares de carrera de élite.
          </p>
        </div>

        {success && (
          <div className="alert alert-success" style={{ marginBottom: '1.5rem' }}>
            <CheckCircle size={20} />
            <div>
              <strong>¡Registro exitoso!</strong> Redirigiendo al inicio de sesión...
            </div>
          </div>
        )}

        {apiError && (
          <div className="alert alert-error" style={{ marginBottom: '1.5rem' }}>
            <div>{apiError}</div>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {/* Name */}
          <div className="form-group">
            <label className="form-label" htmlFor="reg-name">Nombre Completo</label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                id="reg-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control"
                placeholder="Juan Pérez"
                style={{ paddingLeft: '2.5rem' }}
                disabled={success}
              />
              <User size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
            </div>
            {errors.name && <span className="form-error">{errors.name}</span>}
          </div>

          {/* Email */}
          <div className="form-group">
            <label className="form-label" htmlFor="reg-email">Correo Electrónico</label>
            <div style={{ position: 'relative' }}>
              <input
                type="email"
                id="reg-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                placeholder="usuario@gmail.com o @inacap.cl"
                style={{ paddingLeft: '2.5rem' }}
                disabled={success}
              />
              <Mail size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
            </div>
            {errors.email && <span className="form-error">{errors.email}</span>}
          </div>

          {/* Date of Birth */}
          <div className="form-group">
            <label className="form-label" htmlFor="reg-dob">Fecha de Nacimiento</label>
            <div style={{ position: 'relative' }}>
              <input
                type="date"
                id="reg-dob"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="form-control"
                style={{ paddingLeft: '2.5rem' }}
                disabled={success}
              />
              <Calendar size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
            </div>
            {errors.dob && <span className="form-error">{errors.dob}</span>}
          </div>

          {/* Password */}
          <div className="form-group">
            <label className="form-label" htmlFor="reg-pass">Contraseña</label>
            <div style={{ position: 'relative' }}>
              <input
                type="password"
                id="reg-pass"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                placeholder="Mínimo 8 caracteres"
                style={{ paddingLeft: '2.5rem' }}
                disabled={success}
              />
              <Lock size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
            </div>
            {errors.password && <span className="form-error">{errors.password}</span>}
          </div>

          {/* Repeat Password */}
          <div className="form-group">
            <label className="form-label" htmlFor="reg-repeat-pass">Repetir Contraseña</label>
            <div style={{ position: 'relative' }}>
              <input
                type="password"
                id="reg-repeat-pass"
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
                className="form-control"
                placeholder="Repite tu contraseña"
                style={{ paddingLeft: '2.5rem' }}
                disabled={success}
              />
              <ShieldCheck size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
            </div>
            {errors.repeatPassword && <span className="form-error">{errors.repeatPassword}</span>}
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '1.5rem', padding: '0.9rem' }}
            disabled={success}
          >
            Registrarse
          </button>
        </form>

        <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" style={{ color: '#34d399', fontWeight: 600 }}>
            Inicia Sesión
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
