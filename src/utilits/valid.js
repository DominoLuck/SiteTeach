import { z } from "zod";

export const loginSchema = z.object({
	email: z
		.string()
		.min(1, "Почта обязательна")
		.email("Некорректный формат почты")
		.transform((value) => value.trim().toLowerCase()),
	password: z.string().min(6, "Пароль должен быть не менее 6 символов"),
});

export const registerSchema = z
	.object({
		name: z
			.string()
			.min(2, "Имя должно содержать минимум 2 символа")
			.max(40, "Имя слишком длинное"),
		email: z
			.string()
			.min(1, "Почта обязательна")
			.email("Некорректный формат почты")
			.transform((value) => value.trim().toLowerCase()),
		password: z.string().min(6, "Пароль должен быть не менее 6 символов"),
		passwordConfirm: z.string().min(1, "Подтвердите пароль"),
	})
	.superRefine((value, ctx) => {
		if (value.password !== value.passwordConfirm) {
			ctx.addIssue({
				code: "custom",
				path: ["passwordConfirm"],
				message: "Пароли не совпадают",
			});
		}
	});
