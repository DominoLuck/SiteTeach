import { createContext, useContext, useMemo } from "react";
import { useAuthStore } from "../store/authStore";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
	const users = useAuthStore((state) => state.users);
	const currentUserId = useAuthStore((state) => state.currentUserId);
	const login = useAuthStore((state) => state.login);
	const register = useAuthStore((state) => state.register);
	const updateProfile = useAuthStore((state) => state.updateProfile);
	const changePassword = useAuthStore((state) => state.changePassword);
	const logout = useAuthStore((state) => state.logout);

	const currentUser = useMemo(() => {
		const user = users.find((item) => item.id === currentUserId);
		if (!user) {
			return null;
		}

		const copy = { ...user };
		delete copy.password;
		return copy;
	}, [users, currentUserId]);

	const value = useMemo(
		() => ({
			isAuthenticated: Boolean(currentUser),
			currentUser,
			isReady: true,
			login,
			register,
			updateProfile,
			changePassword,
			logout,
		}),
		[currentUser, login, register, updateProfile, changePassword, logout],
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within AuthProvider");
	}
	return context;
};
