// Input.jsx
export default function Input({
	onChangeHandler,
	type,
	placeholder,
	error,
	labelText,
	name,
	value,
}) {
	// label(как children) привязан к input
	return (
		<>
			<label htmlFor={name} className="form-label">
				{labelText}
			</label>

			<input
				id={name}
				name={name}
				value={value}
				type={type}
				placeholder={placeholder}
				error={error}
				onChange={onChangeHandler}
				className="form-input"
				required
			></input>
		</>
	);
}
