function Button({ children, type = 'button', disabled = false, onClick }) {
  return (
    <button
      className="w-full rounded-[6px] border border-transparent bg-button-bg px-5 py-3 text-center font-body-base-medium text-body-base font-medium leading-6 text-button-text shadow-sm md:px-6 md:py-3.5 lg:px-[25px] lg:py-[15px]"
      type={type}
      disabled={disabled}
      onClick={onClick}
      aria-disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
