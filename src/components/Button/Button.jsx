// Button.jsx
export function Button({
	onClick,
	children,
	primaryColor = "base",
	isLoading,
	type = "button",
	...props ///
}) {
	return (
		<button
			type={type}
			className={`btn color-${primaryColor} ${isLoading ? "is-loading" : ""}`}
			onClick={onClick}
			disabled={isLoading}
		>
			{isLoading ? "Загрузка..." : children}
		</button>
	);
}
