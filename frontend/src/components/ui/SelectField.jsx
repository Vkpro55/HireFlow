import { inputClassName } from './TextField.jsx';

function SelectField({ id, name, label, value, onChange, options, required = false }) {
  return (
    <div className="flex w-full flex-col gap-1.5 lg:gap-1">
      <label className="font-body-sm-medium text-body-sm font-medium leading-5 text-text-primary" htmlFor={id}>
        {label}
      </label>
      <select
        id={id}
        name={name || id}
        className={`${inputClassName} appearance-none`}
        value={value}
        onChange={onChange}
        required={required}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectField;