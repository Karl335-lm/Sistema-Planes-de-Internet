import { Home, Users, FileText, Settings, Wifi } from 'lucide-react';

export function Sidebar() {
  const menuItems = [
    { name: 'Inicio / Planes', icon: Home, active: true },
    { name: 'Clientes', icon: Users, active: false },
    { name: 'Reportes', icon: FileText, active: false },
    { name: 'Configuración', icon: Settings, active: false },
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
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <li key={index} style={{ marginBottom: '0.5rem' }}>
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    color: item.active ? '#EA580C' : '#44403C',
                    backgroundColor: item.active ? '#FFF7ED' : 'transparent',
                    textDecoration: 'none',
                    fontWeight: item.active ? 'bold' : '500',
                    fontSize: '0.95rem',
                    transition: '0.2s'
                  }}
                >
                  <Icon size={18} color={item.active ? '#EA580C' : '#78716C'} />
                  {item.name}
                </a>
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