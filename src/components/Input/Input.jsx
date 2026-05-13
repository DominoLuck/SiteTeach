import "./Input.css";

export default function Input({
	onChange,
	type = "text",
	placeholder,
	error,
	labelText = "",
	name,
	value,
	className = "",
	required = true,
	id,
	...props
}) {
	const inputId = id || name;

	return (
		<div className={`form-control ${className}`}>
			{labelText ? (
				<label htmlFor={inputId} className="form-label">
					{labelText}
				</label>
			) : null}
			<input
				id={inputId}
				name={name}
				value={value}
				type={type}
				placeholder={placeholder}
				onChange={onChange}
				className="form-input"
				required={required}
				{...props}
			/>
			{error ? <p className="form-error">{error}</p> : null}
		</div>
	);
}
