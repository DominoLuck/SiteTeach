export function input({ clickHandler, children, primaryColor = "base" }) {
	return (
		<input className={`btn color-${primaryColor}`} onClick={clickHandler}>
			{children}
		</input>
	);
}
