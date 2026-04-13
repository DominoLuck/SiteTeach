import { useNavigate } from "react-router-dom";
import "./HeroPage.css";
import { useState } from "react";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";

function HeroPage() {
	const navigate = useNavigate();

	const handleRegisterClick = () => {
		navigate("/register");
	};

	const handleLoginClick = () => {
		navigate("/login");
	};

	const [inputText, setInputText] = useState("");
	const [isLogin, setIsLogin] = useState(false);
	const [todoList, setTodoList] = useState([
		{ todo: "Первая заметка" },
		{ todo: "ВтораяП заметка" },
		{ todo: "3 заметка" },
	]);
	const handleTodoCreate = (e) => {
		setTodoList([...todoList, { todo: inputText }]);
	};
	return (
		<div className="home-container">
			<div className="home-content">
				<h1 className="home-title">Добро пожаловать!</h1>
				<p className="home-subtitle">
					Здесь что то должно появиться...
				</p>
				<div className="todo__container">
					<ul>
						{todoList.map((todo, index) => (
							<li className="todo-item" id={index}>
								{todo.todo}
							</li>
						))}
					</ul>

					<div className="todo-create">
						<Input
							type="text"
							value={inputText}
							name=""
							id=""
							onChange={(e) => setInputText(e.target.value)}
							placeholder="Введите заметку"
						/>
						<Button
							className="todo-create-btn"
							onClick={handleTodoCreate}
						>
							Создать заметку
						</Button>
					</div>
				</div>
				{!isLogin && (
					<div className="Auth-container">
						<button
							className="home-button"
							onClick={handleRegisterClick}
						>
							Зарегистрироваться
						</button>
						<button
							className="home-button"
							onClick={handleLoginClick}
						>
							Войти
						</button>
					</div>
				)}
			</div>
		</div>
	);
}

export default HeroPage;

// сделать
