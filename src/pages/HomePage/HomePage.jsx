// src/pages/HomePage/HomePage.jsx
import { useNavigate } from 'react-router-dom';
import './HomePage.css'; // импортируем стили для этой страницы

function HomePage() {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">Добро пожаловать!</h1>
        <p className="home-subtitle">Рады видеть вас на нашем сайте</p>
        <button 
          className="home-button"
          onClick={handleRegisterClick}
        >
          Зарегистрироваться
        </button>
      </div>
    </div>
  );
}

export default HomePage;