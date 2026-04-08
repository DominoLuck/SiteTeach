// возраст , имя , смена пароля, аватар
// как в фигме
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input/Input";
import { Button } from "../../components/Button/Button";
import "./ProfilePage.css";

function ProfilePage() {
	const [userData, setUserData] = useState({
		username: "",
		email: "",
		password: "",
		avatar: "",
	});

	// Здесь будет логика загрузки данных при старте
	useEffect(() => {
		// Вызов API: getUserProfile().then(data => setUserData(data))
	}, []);

	return (
		<div className="profile-container">
			<h3>Профиль пользователя</h3>
			<Input
				labelText="Имя пользователя"
				value={userData.username}
				onChangeHandler={(e) =>
					setUserData({ ...userData, username: e.target.value })
				}
			/>

			<h3>Email</h3>
			<Input
				labelText="Изменить почту"
				value={userData.email}
				onChangeHandler={(e) =>
					setUserData({ ...userData, email: e.target.value })
				}
			/>

			<Button primaryColor="primary">Сохранить изменения</Button>
		</div>
	);
}
export default ProfilePage;
