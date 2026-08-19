function Checkbox({ id, name, label }) {
  return (
    <label className="flex items-center gap-3">
      <input
        id={id}
        name={name}
        className="m-0 size-[18px] cursor-pointer rounded border border-border-dark bg-bg-white accent-button-bg"
        type="checkbox"
      />
      <span className="font-ui-base text-ui-base font-normal text-text-secondary">{label}</span>
    </label>
  );
}

export default Checkbox;
