// src/services/clienteService.js

const API_BASE_URL = 'https://dummyjson.com/users';

const INITIAL_CLIENTS = [
  { id: '0001', name: 'Ana Lopez', colonia: 'El Paraíso', createdAt: '14 oct, 2026', status: 'Activo' },
  { id: '0002', name: 'Carlos Pérez', colonia: 'Satelite', createdAt: '30 sep, 2025', status: 'Activo' },
  { id: '0003', name: 'María Ruiz', colonia: 'Manantial', createdAt: '20 dic, 2024', status: 'Inactivo' }
];

// Helper para obtener datos limpios y sin duplicados por ID
const getStoredClients = () => {
  const localData = localStorage.getItem('enlasate_clientes');
  if (!localData) {
    localStorage.setItem('enlasate_clientes', JSON.stringify(INITIAL_CLIENTS));
    return INITIAL_CLIENTS;
  }
  try {
    const parsed = JSON.parse(localData);
    // Filtrar posibles duplicados que hayan quedado guardados previamente por ID
    const unique = Array.from(new Map(parsed.map(item => [item.id, item])).values());
    return unique;
  } catch (e) {
    return INITIAL_CLIENTS;
  }
};

const saveStoredClients = (clients) => {
  localStorage.setItem('enlasate_clientes', JSON.stringify(clients));
};

export const fetchClientes = async ({ search = '', status = '', page = 1, limit = 10 }) => {
  let result = getStoredClients();

  if (search.trim()) {
    const term = search.toLowerCase();
    result = result.filter(c => 
      c.name.toLowerCase().includes(term) || 
      c.id.includes(term) || 
      c.colonia.toLowerCase().includes(term)
    );
  }

  if (status) {
    result = result.filter(c => c.status.toLowerCase() === status.toLowerCase());
  }

  const start = (page - 1) * limit;
  const paginated = result.slice(start, start + limit);

  return {
    clientes: paginated,
    total: result.length
  };
};

export const createCliente = async (clienteData) => {
  // Petición HTTP real simulada / dummy
  try {
    await fetch(`${API_BASE_URL}/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(clienteData)
    });
  } catch (e) {
    console.warn('API add response mock');
  }

  const current = getStoredClients();
  // Asignar ID único basado en timestamp para evitar cualquier duplicado de ID
  const uniqueId = `00${Date.now().toString().slice(-4)}`;

  const newCliente = {
    ...clienteData,
    id: uniqueId,
    createdAt: new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })
  };

  const updated = [newCliente, ...current];
  saveStoredClients(updated);
  return newCliente;
};

export const updateCliente = async (id, clienteData) => {
  try {
    await fetch(`${API_BASE_URL}/1`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(clienteData)
    });
  } catch (e) {
    console.warn('API update response mock');
  }

  const current = getStoredClients();
  const updated = current.map(c => c.id === id ? { ...c, ...clienteData } : c);
  saveStoredClients(updated);
  return { id, ...clienteData };
};

export const deleteCliente = async (id) => {
  try {
    await fetch(`${API_BASE_URL}/1`, { method: 'DELETE' });
  } catch (e) {
    console.warn('API delete response mock');
  }

  const current = getStoredClients();
  const updated = current.filter(c => c.id !== id);
  saveStoredClients(updated);
  return { success: true, id };
};