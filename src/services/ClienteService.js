// Datos iniciales para simular la API con el formato de tu Figma
const INITIAL_CLIENTS = [
  { id: '0001', name: 'Ana Lopez', colonia: 'El Paraíso', createdAt: '14 oct, 2026', status: 'Activo' },
  { id: '0002', name: 'Carlos Pérez', colonia: 'Satelite', createdAt: '30 sep, 2025', status: 'Activo' },
  { id: '0003', name: 'María Ruiz', colonia: 'Manantial', createdAt: '20 dic, 2024', status: 'Inactivo' }
];

export const fetchClientes = async ({ search = '', status = '', page = 1, limit = 10 }) => {
  // Simulación de retraso de red
  await new Promise(resolve => setTimeout(resolve, 300));

  let result = [...INITIAL_CLIENTS];

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
  await new Promise(resolve => setTimeout(resolve, 200));
  return {
    ...clienteData,
    id: clienteData.id || `000${Math.floor(Math.random() * 900) + 100}`,
    createdAt: new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })
  };
};

export const updateCliente = async (id, clienteData) => {
  await new Promise(resolve => setTimeout(resolve, 200));
  return { id, ...clienteData };
};

export const deleteCliente = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 200));
  return { success: true, id };
};