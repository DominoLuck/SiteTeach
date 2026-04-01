export default function Input({
	onChangeHandler,
	type,
	placeholder,
	error,
	labelText,
}) {
	// label(как children) привязан к input
	return (
		<>
			<label htmlFor="" className="form-label">
				{labelText}
			</label>

			<input
				type={type}
				placeholder={placeholder}
				error={error}
				onChangeHandler={onChangeHandler}
				className="form-input"
			></input>
		</>
	);
}
