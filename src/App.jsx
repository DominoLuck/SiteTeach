import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import NotesPage from "./pages/NotesPage/NotesPage.jsx";
import RegisterPage from "./pages/RegisterPage/RegisterPage.jsx";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import ProfilePage from "./pages/ProfilePage/ProfilePage.jsx";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Layout } from "./components/Layout";
import { AuthProvider } from "./context/AuthContext";
import "./App.css";

function App() {
	return (
		<BrowserRouter>
			<AuthProvider>
				<div className="App">
					<Routes>
						<Route element={<Layout />}>
							<Route index element={<Navigate to="/notes" replace />} />
							<Route
								path="/notes"
								element={
									<ProtectedRoute>
										<NotesPage />
									</ProtectedRoute>
								}
							/>
							<Route
								path="/profile"
								element={
									<ProtectedRoute>
										<ProfilePage />
									</ProtectedRoute>
								}
							/>
						</Route>

						<Route path="/login" element={<LoginPage />} />
						<Route path="/register" element={<RegisterPage />} />
						<Route path="*" element={<Navigate to="/notes" replace />} />
					</Routes>
				</div>
			</AuthProvider>
		</BrowserRouter>
	);
}

export default App;
