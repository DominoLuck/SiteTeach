// Button.jsx
export function Button({
	clickHandler,
	children,
	primaryColor = "base",
	isLoading,
	type = "button",
}) {
	return (
		<button>
			type={type}
			className=
			{`btn color-${primaryColor} ${isLoading ? "is-loading" : ""}`}
			onClick={clickHandler}
			disabled={isLoading}
			{isLoading ? "Загрузка..." : children}
		</button>
	);
}
