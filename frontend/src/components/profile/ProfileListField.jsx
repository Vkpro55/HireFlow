function ProfileListField({ label, value, onChange, placeholder }) {
  return (
    <div className="flex w-full flex-col gap-1.5">
      <label className="font-body-sm-medium text-body-sm font-medium leading-5 text-text-primary" htmlFor={label}>{label}</label>
      <input id={label} className="w-full rounded-md border border-border-default bg-input-bg px-3.5 py-3 font-body-sm text-body-sm text-input-text outline-none placeholder:text-input-placeholder" value={value} onChange={onChange} placeholder={placeholder} />
      <p className="font-body-xs text-body-xs text-text-muted">Separate items with commas.</p>
    </div>
  );
}

export default ProfileListField;
