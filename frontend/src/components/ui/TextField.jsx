const inputClassName =
  'w-full rounded-[6px] border border-border-default bg-input-bg px-3.5 py-3 font-body-sm text-body-sm font-normal text-input-text shadow-sm outline-none placeholder:text-input-placeholder md:px-4 md:py-[13px] lg:px-[17px] lg:py-3.5';

function TextField({ id, name, label, type = 'text', placeholder, autoComplete, value, onChange, required = false }) {
  return (
    <div className="flex w-full flex-col gap-1.5 lg:gap-1">
      <label
        className="font-body-sm-medium text-body-sm font-medium leading-5 text-text-primary"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        id={id}
        name={name || id}
        className={inputClassName}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
}

export { inputClassName };
export default TextField;
