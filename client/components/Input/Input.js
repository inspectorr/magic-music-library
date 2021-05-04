function Input({
  name,
  label,
  register = () => {},
  required = false,
  ...props
}) {
  return (
    <div className="input">
      <label className="input__label">{label}</label>
      <input
        className="input__field"
        {...register(name, { required })}
        {...props}
      />
    </div>
  );
}

export default Input;
