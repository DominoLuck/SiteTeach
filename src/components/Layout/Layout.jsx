import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Layout.css";

const NAV_ITEMS = [
	{ to: "/notes", label: "Доска" },
	{ to: "/profile", label: "Профиль" },
];

function Layout() {
	const navigate = useNavigate();
	const { isAuthenticated, currentUser, logout } = useAuth();

	const authLabel = currentUser?.name || "Профиль";

	return (
		<div className="app-layout">
			<header className="app-header">
				<Link to="/" className="app-brand">
					Notes App
				</Link>

				<nav className="app-nav" aria-label="Основная навигация">
					{NAV_ITEMS.map((item) => (
						<NavLink
							key={item.to}
							to={item.to}
							className={({ isActive }) =>
								`app-nav-link ${isActive ? "is-active" : ""}`
							}
						>
							{item.label}
						</NavLink>
					))}
				</nav>

				<div className="app-auth">
					{isAuthenticated ? (
						<>
							<span className="app-user-name">Привет, {authLabel}</span>
							<button className="app-link" onClick={() => navigate("/profile")}>
								Профиль
							</button>
							<button className="app-link" onClick={logout} type="button">
								Выйти
							</button>
						</>
					) : (
						<>
							<Link className="app-link" to="/login">
								Войти
							</Link>
							<Link className="app-link" to="/register">
								Регистрация
							</Link>
						</>
					)}
				</div>
			</header>

			<main className="app-main">
				<Outlet />
			</main>
		</div>
	);
}

export default Layout;
