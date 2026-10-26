import { Home, Users, FileText, Settings, Wifi } from 'lucide-react';

export function Sidebar({ activeTab, setActiveTab }) {
  const menuItems = [
    { id: 'planes', name: 'Inicio / Planes', icon: Home },
    { id: 'clientes', name: 'Clientes', icon: Users },
    { id: 'reportes', name: 'Reportes', icon: FileText },
    { id: 'configuracion', name: 'Configuración', icon: Settings },
  ];

  return (
    <aside style={{
      width: '260px',
      backgroundColor: '#FFFFFF',
      borderRight: '1px solid #E7E5E4',
      minHeight: 'calc(100vh - 70px)',
      padding: '1.5rem 1rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }}>
      <div>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <li key={item.id} style={{ marginBottom: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    color: isActive ? '#EA580C' : '#44403C',
                    backgroundColor: isActive ? '#FFF7ED' : 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: isActive ? 'bold' : '500',
                    fontSize: '0.95rem',
                    transition: '0.2s',
                    textAlign: 'left'
                  }}
                >
                  <Icon size={18} color={isActive ? '#EA580C' : '#78716C'} />
                  {item.name}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', paddingLeft: '0.5rem' }}>
        <Wifi size={18} color="#EA580C" />
        <span style={{ fontWeight: 'bold', color: '#EA580C', fontSize: '0.9rem' }}>Enlasate Team</span>
      </div>
    </aside>
  );
}