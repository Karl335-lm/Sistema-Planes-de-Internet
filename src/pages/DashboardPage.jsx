import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { Home } from 'lucide-react';

export function DashboardPage({ user, onLogout }) {
  const plans = [
    { name: '10 MG', price: '$ 300.00', desc: 'Con internet ilimitado', equip: '10 - 12 equipos concetados simultaneamente' },
    { name: '15 MG', price: '$ 350.00', desc: 'Con internet ilimitado', equip: '14 - 15 equipos concetados simultaneamente' },
    { name: '20 MG', price: '$ 400.00', desc: 'Con internet ilimitado', equip: '20 - 21 equipos concetados simultaneamente' },
    { name: '30 MG', price: '$ 500.00', desc: 'Con internet ilimitado', equip: '25 - 30 equipos concetados simultaneamente' },
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#FAFAF7', width: '100%' }}>
      <Navbar user={user} onLogout={onLogout} />
      
      <div style={{ display: 'flex', flex: 1, width: '100%' }}>
        <Sidebar />
        
        <main style={{ flex: 1, padding: '2.5rem 3rem', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <Home size={20} color="#EA580C" />
            <span style={{ fontWeight: 'bold', color: '#44403C', fontSize: '1.1rem' }}>Inicio / Dashboard</span>
          </div>

          <h1 style={{ color: '#EA580C', fontSize: '2.2rem', fontWeight: 'bold', marginBottom: '0.5rem', marginTop: 0 }}>
            ¡Bienvenido, {user?.firstName || user?.username}! 👋
          </h1>
          
          <p style={{ color: '#1C1917', fontSize: '1.05rem', lineHeight: '1.5', marginBottom: '2.5rem' }}>
            Conectamos a nuestras familias y empresas con el internet del futuro. En nuestro equipo nos apasiona brindar un servicio de fibra óptica estable, simétrico y con tecnología propia. Nuestro compromiso constante es asegurar que cada usuario disfrute la mejor experiencia en su hogar o negocio.
          </p>

          <h3 style={{ color: '#1C1917', marginBottom: '1.2rem', fontSize: '1.3rem' }}>Planes de Internet</h3>

          {/* Tarjetas desplegadas en 4 columnas */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '1.5rem',
            width: '100%' 
          }}>
            {plans.map((plan, idx) => (
              <div key={idx} style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '12px',
                padding: '2rem 1.2rem',
                textAlign: 'center',
                boxShadow: '0 4px 12px rgba(28, 25, 23, 0.03)',
                border: '1px solid #E7E5E4',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                <div>
                  <h4 style={{ fontSize: '1.6rem', fontWeight: 'bold', color: '#1C1917', marginBottom: '0.8rem', marginTop: 0 }}>
                    {plan.name}
                  </h4>
                  <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#EA580C', marginBottom: '1rem' }}>
                    {plan.price}
                  </div>
                  <p style={{ color: '#44403C', fontSize: '0.9rem', fontWeight: '500', marginBottom: '1.2rem' }}>
                    {plan.desc}
                  </p>
                </div>
                <div style={{ color: '#78716C', fontSize: '0.85rem', lineHeight: '1.3' }}>
                  {plan.equip}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}