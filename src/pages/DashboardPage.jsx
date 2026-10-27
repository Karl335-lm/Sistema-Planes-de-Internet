import React, { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { ClientesPage } from './ClientesPage';
import { ConfiguracionPage } from './ConfiguracionPage';

export function DashboardPage({ user, onLogout }) {
  // Pestaña activa por defecto: Inicio / Planes
  const [activeTab, setActiveTab] = useState('planes');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%' }}>
      {/* BARRA SUPERIOR (HEADER) */}
      <header style={{
        height: '70px',
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #E7E5E4',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 2rem'
      }}>
        <h1 style={{ fontSize: '1.2rem', color: '#EA580C', margin: 0, fontWeight: 'bold' }}>
          Enlasate - Sistema de Gestión
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <img 
            src={user?.image || '/perfil.jpeg'} 
            alt="User avatar" 
            style={{ borderRadius: '50%', width: '32px', height: '32px', objectFit: 'cover' }} 
          />
          <span style={{ fontWeight: '600', color: '#1C1917' }}>{user?.name || 'Emily Johnson'}</span>
          <button 
            onClick={onLogout} 
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              background: '#EA580C',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            ↪ Cerrar Sesión
          </button>
        </div>
      </header>

      {/* CONTENIDO PRINCIPAL CON SIDEBAR */}
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        <main style={{ flex: 1, backgroundColor: '#FAFAF7', padding: '2rem' }}>
          {/* PESTAÑA 1: INICIO / PLANES (TU DISEÑO ORIGINAL) */}
          {activeTab === 'planes' && (
            <div>
              <div style={{ fontSize: '0.9rem', color: '#78716C', marginBottom: '1rem' }}>
                Inicio / <strong>Dashboard</strong>
              </div>

              <h1 style={{ fontSize: '1.8rem', color: '#EA580C', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                ¡Bienvenido, {user?.name || 'Emily'}!
              </h1>

              <p style={{ color: '#44403C', maxWidth: '900px', lineHeight: '1.5', marginBottom: '2rem' }}>
                Conectamos a nuestras familias y empresas con el internet del futuro. En nuestro equipo nos apasiona brindar un servicio de fibra óptica estable, simétrico y con tecnología propia. Nuestro compromiso constante es asegurar que cada usuario disfrute la mejor experiencia en su hogar o negocio.
              </p>

              <h2 style={{ fontSize: '1.2rem', color: '#1C1917', marginBottom: '1.5rem', fontWeight: 'bold' }}>
                Planes de Internet
              </h2>

              {/* REJILLA DE TARJETAS DE PLANES */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                <div style={planCardStyle}>
                  <h3 style={planTitleStyle}>10 MG</h3>
                  <div style={planPriceStyle}>$ 300.00</div>
                  <p style={planMetaStyle}>Con internet ilimitado</p>
                  <p style={planDescStyle}>10 - 12 equipos conectados simultáneamente</p>
                </div>

                <div style={planCardStyle}>
                  <h3 style={planTitleStyle}>15 MG</h3>
                  <div style={planPriceStyle}>$ 350.00</div>
                  <p style={planMetaStyle}>Con internet ilimitado</p>
                  <p style={planDescStyle}>14 - 15 equipos conectados simultáneamente</p>
                </div>

                <div style={planCardStyle}>
                  <h3 style={planTitleStyle}>20 MG</h3>
                  <div style={planPriceStyle}>$ 400.00</div>
                  <p style={planMetaStyle}>Con internet ilimitado</p>
                  <p style={planDescStyle}>20 - 21 equipos conectados simultáneamente</p>
                </div>

                <div style={planCardStyle}>
                  <h3 style={planTitleStyle}>30 MG</h3>
                  <div style={planPriceStyle}>$ 500.00</div>
                  <p style={planMetaStyle}>Con internet ilimitado</p>
                  <p style={planDescStyle}>25 - 30 equipos conectados simultáneamente</p>
                </div>
              </div>
            </div>
          )}

          {/* PESTAÑA 2: CLIENTES (FASE 3) */}
          {activeTab === 'clientes' && <ClientesPage />}

          {/* OTRAS PESTAÑAS */}
          {activeTab === 'reportes' && <div><h2>Sección de Reportes</h2></div>}
          {activeTab === 'configuracion' && <ConfiguracionPage />}
        </main>
      </div>
    </div>
  );
}

// ESTILOS DE LAS TARJETAS DE PLANES DE TU CAPTURA
const planCardStyle = {
  backgroundColor: '#FFFFFF',
  borderRadius: '12px',
  padding: '2rem 1.5rem',
  textAlign: 'center',
  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
  border: '1px solid #E7E5E4'
};

const planTitleStyle = {
  fontSize: '1.5rem',
  fontWeight: 'bold',
  color: '#1C1917',
  margin: '0 0 0.5rem 0'
};

const planPriceStyle = {
  fontSize: '1.25rem',
  fontWeight: 'bold',
  color: '#EA580C',
  margin: '0 0 1rem 0'
};

const planMetaStyle = {
  fontSize: '0.85rem',
  fontWeight: '600',
  color: '#44403C',
  margin: '0 0 0.5rem 0'
};

const planDescStyle = {
  fontSize: '0.8rem',
  color: '#78716C',
  margin: 0
};