// src/services/clienteService.js

const API_BASE_URL = 'https://dummyjson.com/users';

const mapUserToCliente = (user) => ({
  id: user.id,
  name: `${user.firstName} ${user.lastName}`,
  colonia: user.address?.city || 'Sin colonia',
  createdAt: new Date().toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }),
  status: user.age && user.age > 30 ? 'Activo' : 'Inactivo', // simulado
  image: user.image,
});

/**
 * GET: trae usuarios desde la API real con búsqueda y paginación.
 */

export const fetchClientes = async ({ search = '', status = '', page = 1, limit = 10 }) => {
  try {
    const skip = (page - 1) * limit;
    const url = search.trim()
      ? `${API_BASE_URL}/search?q=${encodeURIComponent(search)}&limit=${limit}&skip=${skip}`
      : `${API_BASE_URL}?limit=${limit}&skip=${skip}`;

    const response = await fetch(url);
    if (!response.ok) throw new Error('Error al obtener clientes');

    const data = await response.json();
    let clientes = data.users.map(mapUserToCliente);

    if (status) {
      clientes = clientes.filter((c) => c.status === status);
    }

    return {
      clientes,
      total: status ? clientes.length : data.total,
    };
  } catch (error) {
    console.error('fetchClientes error:', error);
    throw new Error('No se pudieron cargar los clientes');
  }
};

/**
 * POST: crea un cliente en la API real 
 */
export const createCliente = async (clienteData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: clienteData.name,
        lastName: '',
        address: { city: clienteData.colonia },
        age: clienteData.status === 'Activo' ? 35 : 25,
      }),
    });

    if (!response.ok) throw new Error('Error al crear cliente');
    const data = await response.json();

    // DummyJSON devuelve el objeto creado con un id nuevo
    return mapUserToCliente({
      ...data,
      firstName: clienteData.name,
      lastName: '',
      address: { city: clienteData.colonia },
      age: clienteData.status === 'Activo' ? 35 : 25,
    });
  } catch (error) {
    console.error('createCliente error:', error);
    throw new Error('No se pudo crear el cliente');
  }
};

/**
 * PUT: actualiza un cliente en la API real
 */
export const updateCliente = async (id, clienteData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: clienteData.name,
        lastName: '',
        address: { city: clienteData.colonia },
        age: clienteData.status === 'Activo' ? 35 : 25,
      }),
    });

    if (!response.ok) throw new Error('Error al actualizar cliente');
    const data = await response.json();

    return mapUserToCliente({
      ...data,
      id,
      firstName: clienteData.name,
      lastName: '',
      address: { city: clienteData.colonia },
      age: clienteData.status === 'Activo' ? 35 : 25,
    });
  } catch (error) {
    console.error('updateCliente error:', error);
    throw new Error('No se pudo actualizar el cliente');
  }
};

/**
 * DELETE: elimina un cliente en la API real
 */
export const deleteCliente = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Error al eliminar cliente');
    const data = await response.json();
    return { success: data.isDeleted, id };
  } catch (error) {
    console.error('deleteCliente error:', error);
    throw new Error('No se pudo eliminar el cliente');
  }
};