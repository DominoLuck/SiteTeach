import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { registerSchema } from "../../utilits/valid";
import { useAuth } from "../../context/AuthContext";
import "./RegisterPage.css";

function RegisterPage() {
	const navigate = useNavigate();
	const { isAuthenticated, register } = useAuth();
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		passwordConfirm: "",
	});
	const [errors, setErrors] = useState({});
	const [errorText, setErrorText] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (isAuthenticated) {
			navigate("/notes", { replace: true });
		}
	}, [isAuthenticated, navigate]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setErrors({});
		setErrorText("");
		setIsLoading(true);

		const result = registerSchema.safeParse(formData);
		if (!result.success) {
			const flattened = result.error.flatten();
			setErrors(flattened.fieldErrors);
			setIsLoading(false);
			return;
		}

		try {
			register(result.data);
			navigate("/notes");
		} catch (error) {
			setErrorText(error.message || "Не удалось зарегистрироваться");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="register-container">
			<div className="register-card">
				<h2 className="register-title">Создать аккаунт</h2>
				<form onSubmit={handleSubmit} className="register-form">
					<div className="form-group">
						<Input
							type="text"
							name="name"
							value={formData.name}
							onChange={handleChange}
							placeholder="Введите ваше имя"
							labelText="Имя"
							error={errors.name?.[0]}
						/>
						<Input
							type="email"
							name="email"
							value={formData.email}
							onChange={handleChange}
							placeholder="Введите email"
							labelText="Email"
							error={errors.email?.[0]}
						/>
						<Input
							type="password"
							name="password"
							value={formData.password}
							onChange={handleChange}
							placeholder="Введите пароль"
							labelText="Пароль"
							error={errors.password?.[0]}
						/>
						<Input
							type="password"
							name="passwordConfirm"
							value={formData.passwordConfirm}
							onChange={handleChange}
							placeholder="Повторите пароль"
							labelText="Подтверждение пароля"
							error={errors.passwordConfirm?.[0]}
						/>
					</div>

					<div className="auth-error">{errorText}</div>

					<div className="button-group">
						<Button
							type="submit"
							className="btn btn-primary"
							isLoading={isLoading}
						>
							Зарегистрироваться
						</Button>
						<Button
							type="button"
							className="btn btn-secondary"
							onClick={() => navigate("/")}
						>
							Назад
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default RegisterPage;
