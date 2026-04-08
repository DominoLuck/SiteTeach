import { useNavigate } from "react-router-dom";
import "./HeroPage.css";

function HeroPage() {
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
				<p className="home-subtitle">
					Здесь что то должно появиться...
				</p>
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

export default HeroPage;

// сделать
