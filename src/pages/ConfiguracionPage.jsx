import React, { useState, useEffect } from 'react';

export const ConfiguracionPage = () => {
  // Estado local del formulario
  const [formData, setFormData] = useState({
    nombreEmpresa: 'Enlasate',
    correoContacto: 'contacto@enlasate.com',
    nombreUsuario: 'Emily Johnson',
    contrasena: '••••••••'
  });

  const [mensaje, setMensaje] = useState('');

  // Cargar datos previos de localStorage al montar
  useEffect(() => {
    const savedConfig = localStorage.getItem('enlasate_config');
    if (savedConfig) {
      try {
        setFormData(JSON.parse(savedConfig));
      } catch (e) {
        console.error('Error al cargar configuración');
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem('enlasate_config', JSON.stringify(formData));
    setMensaje('¡Configuración guardada correctamente!');
    setTimeout(() => setMensaje(''), 3000);
  };

  const handleCancel = () => {
    const savedConfig = localStorage.getItem('enlasate_config');
    if (savedConfig) {
      setFormData(JSON.parse(savedConfig));
    } else {
      setFormData({
        nombreEmpresa: 'Enlasate',
        correoContacto: 'contacto@enlasate.com',
        nombreUsuario: 'Emily Johnson',
        contrasena: '••••••••'
      });
    }
    setMensaje('Cambios descartados.');
    setTimeout(() => setMensaje(''), 3000);
  };

  return (
    <div style={styles.container}>
      {/* TARJETA PRINCIPAL DE CONFIGURACIÓN */}
      <div style={styles.card}>
        <h1 style={styles.title}>Configuración del sistema</h1>
        <p style={styles.subtitle}>
          Administra las preferencias generales, seguridad y notificaciones
        </p>

        <h2 style={styles.sectionHeader}>General</h2>
        <h3 style={styles.sectionSubHeader}>Perfil de la Organización</h3>

        {mensaje && (
          <div style={styles.alert}>
            {mensaje}
          </div>
        )}

        <form onSubmit={handleSave}>
          <div style={styles.grid}>
            {/* NOMBRE DE LA EMPRESA */}
            <div style={styles.formGroup}>
              <label style={styles.label}>Nombre de la empresa</label>
              <input
                type="text"
                name="nombreEmpresa"
                value={formData.nombreEmpresa}
                onChange={handleChange}
                style={styles.input}
                placeholder="Ej. Enlasate"
              />
            </div>

            {/* CORREO DE CONTACTO */}
            <div style={styles.formGroup}>
              <label style={styles.label}>Correo de contacto</label>
              <input
                type="email"
                name="correoContacto"
                value={formData.correoContacto}
                onChange={handleChange}
                style={styles.input}
                placeholder="ejemplo@correo.com"
              />
            </div>

            {/* NOMBRE DE USUARIO */}
            <div style={styles.formGroup}>
              <label style={styles.label}>Nombre de usuario</label>
              <input
                type="text"
                name="nombreUsuario"
                value={formData.nombreUsuario}
                onChange={handleChange}
                style={styles.input}
                placeholder="Nombre de usuario"
              />
            </div>

            {/* CONTRASEÑA */}
            <div style={styles.formGroup}>
              <label style={styles.label}>Contraseña</label>
              <input
                type="password"
                name="contrasena"
                value={formData.contrasena}
                onChange={handleChange}
                style={styles.input}
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* BOTONES DE ACCIÓN */}
          <div style={styles.actionsRow}>
            <button
              type="button"
              onClick={handleCancel}
              style={styles.btnCancel}
            >
              Cancelar
            </button>
            <button
              type="submit"
              style={styles.btnSave}
            >
              Guardar cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '0px',
    backgroundColor: 'transparent',
    width: '100%',
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: '12px',
    padding: '32px 40px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
    width: '100%',            // Ocupa todo el ancho disponible
    maxWidth: '100%',         // Remueve el límite previo de 900px
    boxSizing: 'border-box'
  },
  title: {
    fontSize: '1.75rem',
    color: '#0F172A',
    fontWeight: '700',
    margin: '0 0 6px 0'
  },
  subtitle: {
    fontSize: '0.95rem',
    color: '#64748B',
    margin: '0 0 32px 0'
  },
  sectionHeader: {
    fontSize: '1.4rem',
    color: '#0F172A',
    fontWeight: '700',
    margin: '0 0 4px 0'
  },
  sectionSubHeader: {
    fontSize: '1.15rem',
    color: '#1E293B',
    fontWeight: '600',
    margin: '0 0 24px 0'
  },
  alert: {
    backgroundColor: '#FFF7ED',
    color: '#EA580C',
    padding: '12px 16px',
    borderRadius: '8px',
    fontSize: '0.9rem',
    fontWeight: '600',
    marginBottom: '20px',
    border: '1px solid #FFEDD5'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)', // Dos columnas exactas como en tu prototipo de Figma
    gap: '24px 32px',
    marginBottom: '32px'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  label: {
    fontSize: '0.9rem',
    fontWeight: '700',
    color: '#1E293B'
  },
  input: {
    padding: '12px 16px',
    borderRadius: '8px',
    border: '1px solid #E2E8F0',
    backgroundColor: '#FAF5F2',
    fontSize: '0.95rem',
    outline: 'none',
    color: '#334155',
    width: '100%',
    boxSizing: 'border-box'
  },
  actionsRow: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    marginTop: '24px'
  },
  btnCancel: {
    padding: '10px 24px',
    borderRadius: '8px',
    border: '1px solid #94A3B8',
    backgroundColor: '#FFFFFF',
    color: '#475569',
    fontWeight: '600',
    fontSize: '0.9rem',
    cursor: 'pointer'
  },
  btnSave: {
    padding: '10px 24px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#EA580C',
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: '0.9rem',
    cursor: 'pointer'
  }
};