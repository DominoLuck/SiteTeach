import "./Button.css";

export function Button({
	onClick,
	children,
	primaryColor = "base",
	className = "",
	isLoading = false,
	type = "button",
	...props
}) {
	return (
		<button
			type={type}
			className={`btn color-${primaryColor} ${isLoading ? "is-loading" : ""} ${className}`}
			onClick={onClick}
			disabled={isLoading}
			{...props}
		>
			{isLoading ? "Загрузка..." : children}
		</button>
	);
}
