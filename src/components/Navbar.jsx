import { LogOut } from 'lucide-react';
import './Navbar.css';

export function Navbar({ user, onLogout }) {
  const fotoPerfil = '/perfil.jpeg';

  return (
    <nav className="navbar-container">
      <div className="navbar-brand">
        Enlasate - Sistema de Gestión
      </div>

      <div className="navbar-user-section">
        {/* Foto de perfil en lugar del icono SVG */}
        <img 
          src={fotoPerfil} 
          alt="Foto de perfil" 
          className="navbar-profile-img"
        />

        <span className="navbar-user-name">
          {user?.firstName ? `${user.firstName} ${user.lastName}` : user?.username}
        </span>

        <button onClick={onLogout} className="navbar-logout-btn">
          <LogOut size={16} />
          Cerrar Sesión
        </button>
      </div>
    </nav>
  );
}