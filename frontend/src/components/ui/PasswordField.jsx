import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { inputClassName } from './TextField.jsx';

function PasswordField({ id, name, label, autoComplete }) {
  const [isVisible, setIsVisible] = useState(false);

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
          name={name || id}
          className={`${inputClassName} h-auto pr-11 md:pr-12 lg:h-[46px]`}
          type={isVisible ? 'text' : 'password'}
          autoComplete={autoComplete}
        />
        <button
          type="button"
          className="absolute top-1/2 right-4 flex size-5 -translate-y-1/2 items-center justify-center text-text-muted"
          onClick={() => setIsVisible((visible) => !visible)}
          aria-label={isVisible ? 'Hide password' : 'Show password'}
          aria-pressed={isVisible}
        >
          {isVisible ? (
            <EyeOff className="size-5" strokeWidth={1.5} aria-hidden="true" />
          ) : (
            <Eye className="size-5" strokeWidth={1.5} aria-hidden="true" />
          )}
        </button>
      </div>
    </div>
  );
}

export default PasswordField;
