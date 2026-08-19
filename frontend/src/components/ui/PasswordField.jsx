import { Eye } from 'lucide-react';
import { inputClassName } from './TextField.jsx';

function PasswordField({ id, label, autoComplete }) {
  return (
    <div className="flex w-full flex-col gap-1.5 lg:gap-1">
      <label
        className="font-body-sm-medium text-body-sm font-medium leading-5 text-text-primary"
        htmlFor={id}
      >
        {label}
      </label>
      <div className="relative w-full">
        <input
          id={id}
          className={`${inputClassName} h-auto pr-11 md:pr-12 lg:h-[46px]`}
          type="password"
          autoComplete={autoComplete}
        />
        <span className="absolute top-1/2 right-4 flex size-5 -translate-y-1/2 items-center justify-center overflow-clip">
          <Eye className="size-5 text-text-muted" strokeWidth={1.5} aria-hidden="true" />
        </span>
      </div>
    </div>
  );
}

export default PasswordField;
