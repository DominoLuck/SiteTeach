export function Button({ clickHandler, children, primaryColor = "base" }) {
	return (
		<button className={`btn color-${primaryColor}`} onClick={clickHandler}>
			{children}
		</button>
	);
}
