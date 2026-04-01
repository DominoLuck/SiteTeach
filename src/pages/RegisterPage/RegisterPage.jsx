import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RegisterPage.css";

function RegisterPage() {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		passwordConfirm: "",
	});

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
		if (
			formData.name &&
			formData.email &&
			formData.password &&
			formData.passwordConfirm
		) {
			alert("Регистрация успешна!");
		}
	};

	const handleBack = () => {
		navigate("/");
	};

	return (
		<div className="register-container">
			<div className="register-card">
				<h2 className="register-title">Создать аккаунт</h2>
				<form onSubmit={handleSubmit} className="register-form">
					<div className="form-group">
						<label htmlFor="name" className="form-label">
							Имя
						</label>
						<input
							type="text"
							id="name"
							name="name"
							value={formData.name}
							onChange={handleChange}
							placeholder="Введите ваше имя"
							className="form-input"
							required
						/>
					</div>

					<div className="form-group">
						<label htmlFor="email" className="form-label">
							Email
						</label>
						<input
							type="email"
							id="email"
							name="email"
							value={formData.email}
							onChange={handleChange}
							placeholder="Введите email"
							className="form-input"
							required
						/>
					</div>

					<div className="form-group">
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
					</div>

					<div className="button-group">
						<button type="submit" className="btn btn-primary">
							Зарегистрироваться
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

export default RegisterPage;
