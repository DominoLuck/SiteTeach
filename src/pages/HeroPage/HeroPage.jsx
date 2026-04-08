import { useNavigate } from "react-router-dom";
import "./HeroPage.css";
import { use } from "react";

function HeroPage() {
	const navigate = useNavigate();

	const handleRegisterClick = () => {
		navigate("/register");
	};

	const handleLoginClick = () => {
		navigate("/login");
	};
	const todolist = [
		todo1="Первая заметка",
		todo2="ВтораяП заметка",
		todo3="3 заметка",
	]
	const [isLogin, setIsLogin] = useState(false);
	const [todoList, setTodoList] = useState([])
	const handleTodoCreate = (e) => {
		const todo = e.target
		setTodoList(index,todo)
	}
	return (
		<div className="home-container">
			<div className="home-content">
				<h1 className="home-title">Добро пожаловать!</h1>
				<p className="home-subtitle">
					Здесь что то должно появиться...
				</p>
				<div className="todo__container">
					<ul>
					todolist.map((todo, index) => {
						<li id={index}>{todo}</li>
					})
					</ul>

					<div className="todo-create">
						<input type="text" name="" id="" placeholder="Введите заметку"/>
						<button className="todo-create-btn" onSubmit={handleTodoCreate}>Создать заметку</button>						
					</div>
				</div>
				{isLogin && (<div className="Auth-container">
					<button
						className="home-button"
						onClick={handleRegisterClick}
					>
						Зарегистрироваться
					</button>
					<button className="home-button" onClick={handleLoginClick}>
						Войти
					</button>
				</div>)}
			</div>
		</div>
	);
}

export default HeroPage;

// сделать
