import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input/Input";
import { Button } from "../../components/Button/Button";
import "./ProfilePage.css";

function ProfilePage() {
	const [userData, setUserData] = useState({
		username: "Nameless",
		email: "example@mail.com",
		password: "",
		avatar: "https://via.placeholder.com/150", // заглушка аватара
		age: "",
	});

	useEffect(() => {
		// Здесь будет загрузка данных
	}, []);

	return (
		<div className="profile-screen">
			<div className="profile-card">
				<header className="profile-header">
					<div className="avatar-container">
						<img
							src={userData.avatar}
							alt="Avatar"
							className="profile-avatar"
						/>
						<button className="change-avatar-btn">
							Изменить фото
						</button>
					</div>
					<h2 className="profile-title">Настройки профиля</h2>
				</header>

				<form
					className="profile-form"
					onSubmit={(e) => e.preventDefault()}
				>
					<div className="form-section">
						<h4>Личные данные</h4>
						<Input
							labelText="Имя пользователя"
							value={userData.username}
							onChangeHandler={(e) =>
								setUserData({
									...userData,
									username: e.target.value,
								})
							}
						/>
						<Input
							labelText="Возраст"
							type="number"
							value={userData.age}
							onChangeHandler={(e) =>
								setUserData({
									...userData,
									age: e.target.value,
								})
							}
						/>
					</div>

					<div className="form-section">
						<h4>Безопасность</h4>
						<Input
							labelText="Email"
							type="email"
							value={userData.email}
							onChangeHandler={(e) =>
								setUserData({
									...userData,
									email: e.target.value,
								})
							}
						/>
						<Input
							labelText="Новый пароль"
							type="password"
							placeholder="Оставьте пустым, если не хотите менять"
							value={userData.password}
							onChangeHandler={(e) =>
								setUserData({
									...userData,
									password: e.target.value,
								})
							}
						/>
					</div>

					<div className="profile-actions">
						<Button primaryColor="primary">
							Сохранить изменения
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default ProfilePage;
