import React, { useState } from 'react';
import { Mail, Phone, MapPin, User, MessageSquare, Send, CheckCircle } from 'lucide-react';

const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = 'El nombre es obligatorio.';
    
    if (!email.trim()) {
      newErrors.email = 'El correo electrónico es obligatorio.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'El formato del correo es inválido.';
    }
    
    if (!message.trim()) newErrors.message = 'El mensaje es obligatorio.';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // Simulate form submission
      setSubmitted(true);
      setName('');
      setEmail('');
      setMessage('');
      setErrors({});
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    }
  };

  return (
    <div className="container animate-fade-in" style={{ padding: '3rem 1.5rem 6rem 1.5rem' }}>
      {/* Title Header */}
      <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
        <h1 className="font-serif text-gradient" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
          Contacto & Soporte
        </h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
          Estamos aquí para responder tus consultas sobre ejemplares, visitas al criadero y soporte técnico.
        </p>
        <div style={{
          width: '80px',
          height: '4px',
          backgroundColor: '#fbbf24',
          borderRadius: '2px',
          margin: '1.5rem auto 0 auto'
        }} />
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '4rem',
        alignItems: 'start'
      }}>
        {/* Left Column: Form */}
        <div className="glass" style={{
          padding: '2.5rem',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-lg)'
        }}>
          <h2 className="font-serif" style={{ fontSize: '1.75rem', marginBottom: '1.5rem', color: '#ffffff' }}>
            Envíanos un Mensaje
          </h2>

          {submitted && (
            <div className="alert alert-success" style={{ marginBottom: '1.5rem' }}>
              <CheckCircle size={20} />
              <div>
                <strong>¡Mensaje enviado con éxito!</strong> Nos pondremos en contacto a la brevedad.
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            {/* Name */}
            <div className="form-group">
              <label className="form-label" htmlFor="contact-name">Nombre Completo</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  id="contact-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-control"
                  placeholder="Tu nombre completo"
                  style={{ paddingLeft: '2.5rem' }}
                />
                <User size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
              </div>
              {errors.name && <span className="form-error">{errors.name}</span>}
            </div>

            {/* Email */}
            <div className="form-group">
              <label className="form-label" htmlFor="contact-email">Correo Electrónico</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="email"
                  id="contact-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                  placeholder="ejemplo@correo.com"
                  style={{ paddingLeft: '2.5rem' }}
                />
                <Mail size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
              </div>
              {errors.email && <span className="form-error">{errors.email}</span>}
            </div>

            {/* Message */}
            <div className="form-group">
              <label className="form-label" htmlFor="contact-message">Mensaje</label>
              <div style={{ position: 'relative' }}>
                <textarea
                  id="contact-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="form-control"
                  rows={5}
                  placeholder="Escribe tu mensaje aquí..."
                  style={{ paddingLeft: '2.5rem', resize: 'vertical' }}
                />
                <MessageSquare size={16} style={{ position: 'absolute', left: '1rem', top: '1.2rem', color: 'var(--text-secondary)' }} />
              </div>
              {errors.message && <span className="form-error">{errors.message}</span>}
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%', marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
            >
              <Send size={16} /> Enviar Consulta
            </button>
          </form>
        </div>

        {/* Right Column: Contact Information */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          {/* Company Details */}
          <div className="glass" style={{ padding: '2.25rem', borderRadius: 'var(--radius-lg)' }}>
            <h2 className="font-serif" style={{ fontSize: '1.75rem', marginBottom: '1.5rem', color: '#fbbf24' }}>
              Información de la Empresa
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ padding: '0.6rem', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10b981', borderRadius: '8px' }}>
                  <Phone size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.85rem', color: '#9ca3af', textTransform: 'uppercase' }}>Teléfono de Contacto</h4>
                  <a href="tel:+56911223344" style={{ fontSize: '1.05rem', color: '#ffffff', fontWeight: 600 }}>+56 9 1122 3344</a>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ padding: '0.6rem', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10b981', borderRadius: '8px' }}>
                  <Mail size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.85rem', color: '#9ca3af', textTransform: 'uppercase' }}>Correo de Contacto</h4>
                  <a href="mailto:Luis.espinoza120@inacapmail.cl" style={{ fontSize: '1.05rem', color: '#ffffff', fontWeight: 600 }}>Luis.espinoza120@inacapmail.cl</a>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ padding: '0.6rem', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10b981', borderRadius: '8px', marginTop: '0.2rem' }}>
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.85rem', color: '#9ca3af', textTransform: 'uppercase' }}>Dirección Física</h4>
                  <p style={{ fontSize: '1.05rem', color: '#ffffff', fontWeight: 600, marginBottom: '0.5rem' }}>
                    Av. Américo Vespucio 0315, La Granja, Región Metropolitana
                  </p>
                  
                  {/* Google Maps Link */}
                  <a
                    href="https://maps.google.com/?q=Av.+Américo+Vespucio+0315,+La+Granja,+Region+Metropolitana"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-gold"
                    style={{
                      padding: '0.4rem 0.8rem',
                      fontSize: '0.8rem',
                      borderRadius: 'var(--radius-sm)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      textTransform: 'none',
                      letterSpacing: 'normal',
                      marginTop: '0.25rem'
                    }}
                  >
                    <MapPin size={14} /> Ver en Google Maps
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Support Details */}
          <div className="glass" style={{
            padding: '2.25rem',
            borderRadius: 'var(--radius-lg)',
            borderLeft: '4px solid #fbbf24'
          }}>
            <h2 className="font-serif" style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#ffffff' }}>
              Soporte de Contacto
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div>
                <h4 style={{ fontSize: '0.8rem', color: '#9ca3af', textTransform: 'uppercase' }}>Encargado</h4>
                <p style={{ fontSize: '1.1rem', color: '#ffffff', fontWeight: 600 }}>Luis Anthony Espinoza Pereira</p>
              </div>
              <div>
                <h4 style={{ fontSize: '0.8rem', color: '#9ca3af', textTransform: 'uppercase' }}>Correo de Soporte</h4>
                <a href="mailto:Luis.espinoza120@inacapmail.cl" style={{ fontSize: '1rem', color: '#34d399', fontWeight: 600 }}>Luis.espinoza120@inacapmail.cl</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Embedded interactive Google Map placeholder pointing to INACAP La Granja */}
      <div className="glass" style={{
        marginTop: '4rem',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        border: '1px solid rgba(16, 185, 129, 0.2)',
        height: '350px'
      }}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3326.314227092305!2d-70.6276856!3d-33.5191834!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662d08a55638c11%3A0xe54d89617be34f8!2sINACAP%20Sede%20La%20Granja!5e0!3m2!1ses-419!2scl!4v1700000000000!5m2!1ses-419!2scl"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Ubicación INACAP Sede La Granja"
        />
      </div>
    </div>
  );
};

export default Contact;
