import { inputClassName } from './TextField.jsx';

function TextAreaField({ id, name, label, value, onChange, placeholder, rows = 5, required = false }) {
  return (
    <div className="flex w-full flex-col gap-1.5 lg:gap-1">
      <label className="font-body-sm-medium text-body-sm font-medium leading-5 text-text-primary" htmlFor={id}>
        {label}
      </label>
      <textarea
        id={id}
        name={name || id}
        className={`${inputClassName} resize-y`}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        required={required}
      />
    </div>
  );
}

export default TextAreaField;