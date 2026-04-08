import { BrowserRouter, Routes, Route } from "react-router-dom";
import HeroPage from "./pages/HeroPage/HeroPage.jsx"; // ← исправлено: ./, а не ../
import RegisterPage from "./pages/RegisterPage/RegisterPage.jsx"; // ← исправлено
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import "./App.css";
import { Button } from "./components/Button";
import Input from "./components/Input/Input";
function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<Routes>
					<Route path="/" element={<HeroPage />} />
					<Route path="/register" element={<RegisterPage />} />
					<Route path="/login" element={<LoginPage />}></Route>
					<Route
						path="*"
						element={
							<div
								style={{
									textAlign: "center",
									marginTop: "50px",
								}}
							>
								<h1>404 - Страница не найдена</h1>
								<button
									onClick={() => (window.location.href = "/")}
								>
									Вернуться на главную
								</button>
							</div>
						}
					/>
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
