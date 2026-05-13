import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { loginSchema } from "../../utilits/valid";
import { useAuth } from "../../context/AuthContext";
import "./LoginPage.css";

function LoginPage() {
	const navigate = useNavigate();
	const location = useLocation();
	const { isAuthenticated, login } = useAuth();
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const [errors, setErrors] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [errorText, setErrorText] = useState("");

	const redirectPath = useMemo(
		() => location.state?.from || "/notes",
		[location.state],
	);

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

		const result = loginSchema.safeParse(formData);
		if (!result.success) {
			const flattened = result.error.flatten();
			setErrors(flattened.fieldErrors);
			setIsLoading(false);
			return;
		}

		try {
			login(result.data);
			navigate(redirectPath);
		} catch (error) {
			setErrorText(error.message || "Не удалось войти");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="login-container">
			<div className="login-card">
				<h2 className="login-title">Войти в аккаунт</h2>
				<form onSubmit={handleSubmit} className="login-form">
					<div className="form-group">
						<Input
							type="email"
							name="email"
							value={formData.email}
							onChange={handleChange}
							placeholder="Введите почту"
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
					</div>

					<div className="auth-error">{errorText}</div>

					<div className="register-group">
						<Link to="/register">Зарегистрироваться</Link>
					</div>

					<div className="button-group">
						<Button
							type="submit"
							className="btn-secondary"
							isLoading={isLoading}
						>
							Войти
						</Button>
						<Button
							type="button"
							className="btn-secondary"
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

export default LoginPage;
