import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  fetchClientes, 
  createCliente, 
  updateCliente, 
  deleteCliente 
} from '../services/clienteService';
import { ClienteModal } from '../components/ClienteModal';

export const ClientesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Sincronización con Parámetros URL
  const search = searchParams.get('search') || '';
  const status = searchParams.get('status') || '';
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '10', 10);

  // Estados locales
  const [clientes, setClientes] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Estados Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCliente, setEditingCliente] = useState(null);

  // Cargar lista de clientes
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchClientes({ search, status, page, limit });
        setClientes(data.clientes);
        setTotal(data.total);
      } catch (err) {
        setError('Error al cargar la lista de clientes');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [search, status, page, limit]);

  // Helper para URL
  const updateUrlParams = (newParams) => {
    const updated = new URLSearchParams(searchParams);
    Object.entries(newParams).forEach(([key, value]) => {
      if (value) updated.set(key, value);
      else updated.delete(key);
    });
    setSearchParams(updated);
  };

  // Handlers de Filtros
  const handleSearchChange = (e) => updateUrlParams({ search: e.target.value, page: 1 });
  const handleStatusChange = (e) => updateUrlParams({ status: e.target.value, page: 1 });
  const handlePageChange = (newPage) => updateUrlParams({ page: newPage });

  // Operaciones CRUD (Fase 3B)
  const handleOpenAdd = () => {
    setEditingCliente(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (cliente) => {
    setEditingCliente(cliente);
    setIsModalOpen(true);
  };

  const handleSave = async (formData) => {
    if (editingCliente) {
      if (!window.confirm('¿Deseas guardar los cambios de este cliente?')) return;
      try {
        await updateCliente(editingCliente.id, formData);
        setClientes(prev => prev.map(c => c.id === editingCliente.id ? { ...c, ...formData } : c));
      } catch (err) {
        alert('Error al actualizar cliente');
      }
    } else {
      try {
        const newCliente = await createCliente(formData);
        setClientes(prev => [newCliente, ...prev]);
      } catch (err) {
        alert('Error al registrar cliente');
      }
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este cliente?')) return;
    try {
      await deleteCliente(id);
      setClientes(prev => prev.filter(c => c.id !== id));
    } catch (err) {
      alert('Error al eliminar cliente');
    }
  };

  const totalPages = Math.ceil(total / limit) || 1;

  return (
    <div style={figmaStyles.container}>
      {/* 1. TARJETAS DE MÉTRICAS (KPIS) COMO EN FIGMA */}
      <div style={figmaStyles.kpiGrid}>
        <div style={figmaStyles.kpiCard}>
          <h2 style={figmaStyles.kpiValue}>2,846</h2>
          <p style={figmaStyles.kpiLabel}>Clientes registrados</p>
        </div>
        <div style={figmaStyles.kpiCard}>
          <h2 style={figmaStyles.kpiValue}>1,560</h2>
          <p style={figmaStyles.kpiLabel}>Clientes activos</p>
        </div>
        <div style={figmaStyles.kpiCard}>
          <h2 style={figmaStyles.kpiValue}>500</h2>
          <p style={figmaStyles.kpiLabel}>Registros este mes</p>
        </div>
        <div style={figmaStyles.kpiCard}>
          <h2 style={figmaStyles.kpiValue}>95.0%</h2>
          <p style={figmaStyles.kpiLabel}>Índice de actividad</p>
        </div>
      </div>

      {/* 2. SECCIÓN PRINCIPAL: DIRECTORIO DE CLIENTES */}
      <div style={figmaStyles.contentCard}>
        <h2 style={figmaStyles.sectionTitle}>Directorio de Clientes</h2>
        <p style={figmaStyles.sectionSubtitle}>Consulta, filtra y administra los registros del sistema</p>

        {/* BARRA DE BÚSQUEDA Y FILTROS */}
        <div style={figmaStyles.filterRow}>
          <input
            type="text"
            placeholder="Buscar por nombre, correo o ID..."
            value={search}
            onChange={handleSearchChange}
            style={figmaStyles.filterInput}
          />

          <select value={status} onChange={handleStatusChange} style={figmaStyles.filterSelect}>
            <option value="">Todos los estados</option>
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
          </select>

          <select defaultValue="" style={figmaStyles.filterSelect}>
            <option value="">Todos los roles</option>
          </select>

          <button onClick={handleOpenAdd} style={figmaStyles.btnExport}>
            + Agregar Cliente
          </button>
        </div>

        {/* INDICADOR DE CARGA Y ERROR */}
        {loading && <p style={{ textAlign: 'center', color: '#64748b' }}>Cargando clientes...</p>}
        {error && <p style={{ textAlign: 'center', color: '#dc2626' }}>{error}</p>}

        {/* TABLA DE CLIENTES (FIGMA) */}
        {!loading && !error && (
          <>
            <table style={figmaStyles.table}>
              <thead>
                <tr style={figmaStyles.thRow}>
                  <th style={figmaStyles.th}>Cliente</th>
                  <th style={figmaStyles.th}>ID</th>
                  <th style={figmaStyles.th}>Colonia</th>
                  <th style={figmaStyles.th}>Fecha de alta</th>
                  <th style={figmaStyles.th}>Estado</th>
                  <th style={{ ...figmaStyles.th, textAlign: 'center' }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {clientes.length === 0 ? (
                  <tr>
                    <td colSpan="6" style={{ textAlign: 'center', padding: '20px', color: '#64748b' }}>
                      No se encontraron clientes.
                    </td>
                  </tr>
                ) : (
                  clientes.map((item) => (
                    <tr key={item.id} style={figmaStyles.tr}>
                      <td style={{ ...figmaStyles.td, fontWeight: '700' }}>{item.name}</td>
                      <td style={figmaStyles.td}>{item.id}</td>
                      <td style={figmaStyles.td}>{item.colonia}</td>
                      <td style={figmaStyles.td}>{item.createdAt}</td>
                      <td style={{ ...figmaStyles.td, fontWeight: '700' }}>{item.status}</td>
                      <td style={{ ...figmaStyles.td, textAlign: 'center' }}>
                        <button onClick={() => handleOpenEdit(item)} style={figmaStyles.actionBtn}>✏️</button>
                        <button onClick={() => handleDelete(item.id)} style={figmaStyles.actionBtn}>🗑️</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            {/* CONTROLES DE PAGINACIÓN */}
            <div style={figmaStyles.pagination}>
              <button 
                onClick={() => handlePageChange(page - 1)} 
                disabled={page <= 1}
                style={figmaStyles.pageBtn}
              >
                Anterior
              </button>
              <span>Página {page} de {totalPages}</span>
              <button 
                onClick={() => handlePageChange(page + 1)} 
                disabled={page >= totalPages}
                style={figmaStyles.pageBtn}
              >
                Siguiente
              </button>
            </div>
          </>
        )}
      </div>

      <ClienteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        initialData={editingCliente}
      />
    </div>
  );
};

const figmaStyles = {
  container: { padding: '20px', background: '#f8fafc', minHeight: '100vh', fontFamily: 'sans-serif' },
  kpiGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' },
  kpiCard: { background: '#ffffff', padding: '20px', borderRadius: '8px', textAlign: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' },
  kpiValue: { fontSize: '1.8rem', margin: '0 0 6px 0', color: '#0f172a', fontWeight: '800' },
  kpiLabel: { margin: 0, color: '#475569', fontSize: '0.85rem', fontWeight: '500' },
  contentCard: { background: '#ffffff', padding: '24px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' },
  sectionTitle: { margin: '0 0 4px 0', fontSize: '1.4rem', color: '#0f172a', fontWeight: '700' },
  sectionSubtitle: { margin: '0 0 20px 0', color: '#64748b', fontSize: '0.9rem' },
  filterRow: { display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' },
  filterInput: { flex: '1 1 240px', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' },
  filterSelect: { padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#fff', outline: 'none' },
  btnExport: { padding: '8px 20px', borderRadius: '8px', background: '#e65100', color: '#fff', border: 'none', fontWeight: '600', cursor: 'pointer', marginLeft: 'auto' },
  table: { width: '100%', borderCollapse: 'collapse', textAlign: 'left' },
  thRow: { background: '#e2e8f0' },
  th: { padding: '12px 16px', color: '#475569', fontSize: '0.85rem', fontWeight: '700' },
  tr: { borderBottom: '1px solid #f1f5f9' },
  td: { padding: '12px 16px', fontSize: '0.9rem', color: '#334155' },
  actionBtn: { background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem', padding: '4px' },
  pagination: { marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  pageBtn: { padding: '6px 14px', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#fff', cursor: 'pointer' }
};