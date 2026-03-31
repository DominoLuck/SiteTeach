import { useNavigate } from "react-router-dom";
import "./WelcomePage.css";

function WelcomePage() {
	const navigate = useNavigate();

	const handleRegisterClick = () => {
		navigate("/register");
	};

	const handleLoginClick = () => {
		navigate("/login");
	};

	return (
		<div className="home-container">
			<div className="home-content">
				<h1 className="home-title">Добро пожаловать!</h1>
				<p className="home-subtitle">Рады видеть вас на нашем сайте</p>
				<button className="home-button" onClick={handleRegisterClick}>
					Зарегистрироваться
				</button>
				<button className="home-button" onClick={handleLoginClick}>
					Войти
				</button>
			</div>
		</div>
	);
}

export default WelcomePage;

// сделать
