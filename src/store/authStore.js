import { create } from "zustand";
import { persist } from "zustand/middleware";

const normalizeEmail = (email) => email.trim().toLowerCase();

const toPublicUser = (user) => {
	if (!user) {
		return null;
	}

	const copy = { ...user };
	delete copy.password;
	return copy;
};

const createUserEntity = ({ name, email, password }) => ({
	id: crypto.randomUUID(),
	name: name.trim(),
	email: normalizeEmail(email),
	password,
	age: "",
	avatar: "",
	bio: "",
	createdAt: new Date().toISOString(),
});

export const useAuthStore = create(
	persist(
		(set, get) => ({
			users: [],
			currentUserId: null,

			getCurrentUser: () => {
				const { users, currentUserId } = get();
				return toPublicUser(users.find((user) => user.id === currentUserId));
			},

			register: ({ name, email, password }) => {
				const sanitizedEmail = normalizeEmail(email);
				const { users } = get();

				if (!name || !sanitizedEmail || !password) {
					throw new Error("Заполните все поля");
				}

				if (users.some((user) => user.email === sanitizedEmail)) {
					throw new Error("Пользователь с такой почтой уже зарегистрирован");
				}

				const user = createUserEntity({ name, email: sanitizedEmail, password });
				set({
					users: [...users, user],
					currentUserId: user.id,
				});

				return toPublicUser(user);
			},

			login: ({ email, password }) => {
				const sanitizedEmail = normalizeEmail(email);
				const user = get().users.find((item) => item.email === sanitizedEmail);

				if (!user) {
					throw new Error("Пользователь не найден");
				}

				if (user.password !== password) {
					throw new Error("Неверный пароль");
				}

				set({ currentUserId: user.id });
				return toPublicUser(user);
			},

			logout: () => {
				set({ currentUserId: null });
			},

			updateProfile: (updates) => {
				const { users, currentUserId } = get();
				if (!currentUserId) {
					throw new Error("Требуется авторизация");
				}

				const index = users.findIndex((user) => user.id === currentUserId);
				if (index === -1) {
					throw new Error("Пользователь не найден");
				}

				const nextEmail = updates.email
					? normalizeEmail(updates.email)
					: users[index].email;

				if (
					updates.email &&
					users.some((user) => user.id !== currentUserId && user.email === nextEmail)
				) {
					throw new Error("Эта почта уже используется");
				}

				if (updates.name !== undefined && !updates.name.trim()) {
					throw new Error("Имя пользователя не может быть пустым");
				}

				const nextUsers = [...users];
				nextUsers[index] = {
					...nextUsers[index],
					...updates,
					name: updates.name?.trim() || nextUsers[index].name,
					email: nextEmail,
					updatedAt: new Date().toISOString(),
				};

				set({ users: nextUsers });
				return toPublicUser(nextUsers[index]);
			},

			changePassword: ({ currentPassword, newPassword }) => {
				const { users, currentUserId } = get();
				if (!currentUserId) {
					throw new Error("Требуется авторизация");
				}

				if (!currentPassword || !newPassword) {
					throw new Error("Заполните поля текущего и нового пароля");
				}

				if (newPassword.length < 6) {
					throw new Error("Пароль должен быть не менее 6 символов");
				}

				const index = users.findIndex((user) => user.id === currentUserId);
				if (index === -1) {
					throw new Error("Пользователь не найден");
				}

				if (users[index].password !== currentPassword) {
					throw new Error("Текущий пароль указан неверно");
				}

				const nextUsers = [...users];
				nextUsers[index] = {
					...nextUsers[index],
					password: newPassword,
					updatedAt: new Date().toISOString(),
				};

				set({ users: nextUsers });
				return toPublicUser(nextUsers[index]);
			},
		}),
		{
			name: "notesAppAuth",
		},
	),
);
