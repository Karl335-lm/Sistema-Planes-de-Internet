import React, { useState, useEffect } from 'react';

export const ClienteModal = ({ isOpen, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    name: '',
    colonia: '',
    status: 'Activo'
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        colonia: initialData.colonia || '',
        status: initialData.status || 'Activo'
      });
    } else {
      setFormData({ name: '', colonia: '', status: 'Activo' });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.header}>
          <h3 style={styles.title}>{initialData ? '✏️ Editar Cliente' : '➕ Registrar Nuevo Cliente'}</h3>
          <button onClick={onClose} style={styles.closeBtn}>&times;</button>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Nombre del Cliente</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Ej. Ana Lopez"
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Colonia / Ubicación</label>
            <input
              type="text"
              name="colonia"
              value={formData.colonia}
              onChange={handleChange}
              required
              placeholder="Ej. El Paraíso"
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Estado</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              style={styles.input}
            >
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>
          </div>

          <div style={styles.actions}>
            <button type="button" onClick={onClose} style={styles.btnSecondary}>Cancelar</button>
            <button type="submit" style={styles.btnPrimary}>Guardar Cliente</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex',
    justifyContent: 'center', alignItems: 'center', zIndex: 1100,
    backdropFilter: 'blur(2px)'
  },
  modal: {
    background: '#ffffff', borderRadius: '12px', width: '90%', maxWidth: '440px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.15)', overflow: 'hidden'
  },
  header: {
    padding: '16px 20px', borderBottom: '1px solid #f1f5f9',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center'
  },
  title: { margin: 0, fontSize: '1.1rem', color: '#0f172a', fontWeight: '600' },
  closeBtn: { background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#64748b' },
  form: { padding: '20px' },
  formGroup: { marginBottom: '16px' },
  label: { display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#475569', marginBottom: '6px' },
  input: {
    width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1',
    fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box'
  },
  actions: { display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '24px' },
  btnSecondary: {
    padding: '9px 16px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#fff',
    color: '#475569', fontWeight: '600', cursor: 'pointer'
  },
  btnPrimary: {
    padding: '9px 18px', borderRadius: '8px', border: 'none', background: '#e65100',
    color: '#fff', fontWeight: '600', cursor: 'pointer'
  }
};