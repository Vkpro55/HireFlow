function Checkbox({ label }) {
  return (
    <label className="flex items-center gap-3">
      <input
        className="m-0 size-[18px] appearance-none rounded border border-border-dark bg-bg-white"
        type="checkbox"
      />
      <span className="font-ui-base text-ui-base font-normal text-text-secondary">{label}</span>
    </label>
  );
}

export default Checkbox;
