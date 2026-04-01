import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginApi } from "../../api/auth";
import "./LoginPage.css";
import { email } from "zod";
import Input from "../../components/Input/Input";

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
							type={email}
							placeholder={"Введите почту"}
							labelText={"Email"}
						></Input>
						<Input
							type={"password"}
							placeholder={"Введите пароль"}
							labelText={"Пароль"}
						></Input>
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
						<button type="submit" className="btn btn-primary">
							Войти
						</button>
						<button
							type="button"
							onClick={handleBack}
							className="btn btn-secondary"
						>
							Назад
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default LoginPage;
