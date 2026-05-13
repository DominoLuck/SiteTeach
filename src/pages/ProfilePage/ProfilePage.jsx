import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input/Input";
import { Button } from "../../components/Button/Button";
import { useAuth } from "../../context/AuthContext";
import "./ProfilePage.css";

const EMPTY = {
	name: "",
	email: "",
	age: "",
	avatar: "",
	bio: "",
	currentPassword: "",
	newPassword: "",
	newPasswordConfirm: "",
};

function ProfilePage() {
	const navigate = useNavigate();
	const { currentUser, updateProfile, logout, changePassword } = useAuth();
	const [formData, setFormData] = useState(() => ({
		...EMPTY,
		name: currentUser?.name || "",
		email: currentUser?.email || "",
		age: currentUser?.age || "",
		avatar: currentUser?.avatar || "",
		bio: currentUser?.bio || "",
	}));
	const [infoMessage, setInfoMessage] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setInfoMessage("");
		setErrorMessage("");

		try {
			if (formData.newPassword || formData.currentPassword || formData.newPasswordConfirm) {
				if (
					!formData.currentPassword ||
					!formData.newPassword ||
					!formData.newPasswordConfirm
				) {
					setErrorMessage("Для смены пароля заполните все поля");
					return;
				}
				if (formData.newPassword !== formData.newPasswordConfirm) {
					setErrorMessage("Новый пароль и подтверждение не совпадают");
					return;
				}
				changePassword({
					currentPassword: formData.currentPassword,
					newPassword: formData.newPassword,
				});
			}

			updateProfile({
				name: formData.name,
				email: formData.email,
				age: formData.age,
				avatar: formData.avatar,
				bio: formData.bio,
			});

			setInfoMessage("Данные профиля сохранены");
			setFormData((prev) => ({
				...prev,
				currentPassword: "",
				newPassword: "",
				newPasswordConfirm: "",
			}));
		} catch (error) {
			setErrorMessage(error.message || "Не удалось сохранить профиль");
		}
	};

	const handleLogout = () => {
		logout();
		navigate("/");
	};

	if (!currentUser) {
		return null;
	}

	return (
		<div className="profile-screen">
			<div className="profile-card">
				<header className="profile-header">
					<div className="avatar-container">
						<img
							src={
								formData.avatar ||
								"https://via.placeholder.com/150"
						}
							alt="Avatar"
							className="profile-avatar"
						/>
						<p className="profile-caption">Аватар обновить в будущем</p>
					</div>
					<h2 className="profile-title">Настройки профиля</h2>
				</header>

				{errorMessage ? <p className="auth-error">{errorMessage}</p> : null}
				{infoMessage ? <p className="profile-message">{infoMessage}</p> : null}

				<form className="profile-form" onSubmit={handleSubmit}>
					<div className="form-section">
						<h4>Личные данные</h4>
						<Input
							labelText="Имя пользователя"
							name="name"
							value={formData.name}
							onChange={handleChange}
						/>
						<Input
							labelText="Возраст"
							type="number"
							name="age"
							value={formData.age}
							onChange={handleChange}
						/>
						<Input
							labelText="Ссылка на фото"
							name="avatar"
							value={formData.avatar}
							placeholder="https://..."
							onChange={handleChange}
						/>
						<Input
							labelText="О себе"
							name="bio"
							value={formData.bio}
							onChange={handleChange}
						/>
					</div>

					<div className="form-section">
						<h4>Безопасность</h4>
						<Input
							labelText="Email"
							type="email"
							name="email"
							value={formData.email}
							onChange={handleChange}
						/>
						<Input
							labelText="Текущий пароль"
							type="password"
							name="currentPassword"
							value={formData.currentPassword}
							onChange={handleChange}
							required={false}
						/>
						<Input
							labelText="Новый пароль"
							type="password"
							name="newPassword"
							value={formData.newPassword}
							onChange={handleChange}
							required={false}
						/>
						<Input
							labelText="Подтверждение нового пароля"
							type="password"
							name="newPasswordConfirm"
							value={formData.newPasswordConfirm}
							onChange={handleChange}
							required={false}
						/>
					</div>

					<div className="profile-actions">
						<Button type="submit" className="btn-primary">
							Сохранить изменения
						</Button>
						<Button type="button" className="btn-secondary" onClick={handleLogout}>
							Выйти
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default ProfilePage;
