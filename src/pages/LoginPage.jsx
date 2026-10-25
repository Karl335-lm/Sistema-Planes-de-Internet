import { useState } from 'react';
import { loginUser } from '../services/authService';
import { Wifi, User } from 'lucide-react';
import './LoginPage.css'; 

export function LoginPage({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ username: '', password: '', general: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = { username: '', password: '', general: '' };
    let hasError = false;

    if (!username.trim()) {
      newErrors.username = 'El usuario o correo es obligatorio.';
      hasError = true;
    }

    if (!password.trim()) {
      newErrors.password = 'La contraseña es obligatoria.';
      hasError = true;
    }

    setErrors(newErrors);

    if (hasError) return;

    setLoading(true);

    try {
      const data = await loginUser(username, password);
      onLoginSuccess(data);
    } catch (err) {
      setErrors((prev) => ({
        ...prev,
        general: 'Usuario o contraseña incorrectos. Por favor, verifica tus datos.'
      }));
    }finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-logo-container">
        <Wifi size={40} color="#EA580C" />
        <span className="login-logo-text">Enlasate</span>
      </div>

      <div className="login-card">
        <h2 className="login-title">Iniciar Sesión</h2>

        <div className="login-avatar">
          <User size={32} color="#EA580C" />
        </div>

        {errors.general && (
          <div className="login-error-alert">
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="login-form">
          <div className="login-input-group">
            <input
              type="text"
              placeholder="Correo electrónico o usuario"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                if (errors.username) setErrors({ ...errors, username: '' });
              }}
              className={`login-input ${errors.username ? 'login-input-error' : 'login-input-normal'}`}
            />
            {errors.username && (
              <span className="login-field-error">{errors.username}</span>
            )}
          </div>

          <div className="login-input-group">
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors({ ...errors, password: '' });
              }}
              className={`login-input ${errors.password ? 'login-input-error' : 'login-input-normal'}`}
            />
            {errors.password && (
              <span className="login-field-error">{errors.password}</span>
            )}
          </div>

          <button type="submit" disabled={loading} className="login-button">
            {loading ? 'Validando...' : 'Entrar'}
          </button>
        </form>

        <div className="login-tip">
          Tip de prueba: <strong>emilys</strong> / <strong>emilyspass</strong>
        </div>
      </div>
    </div>
  );
}