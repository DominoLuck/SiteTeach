import { z } from "zod";
export const loginSchema = z.object({
	email: z
		.string()
		.min(1, "Почта обязательна")
		.email("Некорректный формат почты"),
	password: z.string().min(6, "Пароль должен быть не менее 6 символов"),
});
