function RoleCard({ selected, onSelect, icon: Icon, title, description }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`flex min-w-0 flex-1 flex-col items-start gap-3 rounded-[12px] border border-solid p-5 text-left ${
        selected ? 'border-border-dark bg-bg-primary' : 'border-border-light bg-bg-white'
      }`}
    >
      <span className="flex size-6 items-center justify-center overflow-clip">
        <Icon className="size-5 text-text-primary" strokeWidth={1.5} aria-hidden="true" />
      </span>
      <span className="flex w-full flex-col gap-1">
        <span className="w-full font-body-base-medium text-body-base font-semibold leading-5 text-text-primary">
          {title}
        </span>
        <span className="w-full font-body-xs text-body-xs font-normal leading-[1.4] text-text-secondary">
          {description}
        </span>
      </span>
    </button>
  );
}

export default RoleCard;
