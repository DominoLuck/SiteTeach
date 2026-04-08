import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginApi } from "../../api/auth";
import "./LoginPage.css";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

function LoginPage() {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("Отправка формы:", formData);

		navigate;
		("/profile");
		// Валид
	};

	const handleBack = () => {
		navigate("/");
	};

	return (
		<div className="login-container">
			<div className="login-card">
				<h2 className="login-title">Войти в аккаунт</h2>
				<form onSubmit={handleSubmit} className="login-form">
					<div className="form-group">
						<Input
							type="email" // Пишем строкой, а не переменной из zod!
							name="email" // Чтобы handleChange сработал
							value={formData.email}
							onChangeHandler={handleChange}
							placeholder="Введите почту"
							labelText="Email"
						/>
						<Input
							type="password"
							name="password"
							value={formData.password}
							onChangeHandler={handleChange}
							placeholder="Введите пароль"
							labelText="Пароль"
						/>
					</div>

					{/* <div className="form-group">
						<label htmlFor="password" className="form-label">
							Пароль
						</label>
						<input
							type="password"
							id="password"
							name="password"
							value={formData.password}
							onChange={handleChange}
							placeholder="Введите пароль"
							className="form-input"
							required
							minLength="6"
						/>
					</div> */}

					<div className="register-group">
						<Link to="/register">Зарегестрироватсья</Link>
					</div>

					<div className="button-group">
						<Button
							type="submit"
							onClick={handleSubmit}
							className="btn btn-secondary"
						>
							Войти
						</Button>

						<Button
							type="button"
							onClick={handleBack}
							className="btn btn-secondary"
						>
							Назад
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default LoginPage;
