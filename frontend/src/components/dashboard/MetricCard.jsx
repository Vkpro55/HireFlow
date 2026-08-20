function MetricCard({ label, value, detail }) {
  return (
    <article className="min-w-0 border border-border-light bg-bg-white p-5 sm:p-6">
      <p className="font-body-sm text-body-sm text-text-muted">{label}</p>
      <p className="mt-3 font-display-md text-display-md leading-none text-text-primary">{value}</p>
      {detail ? <p className="mt-3 font-body-sm text-body-sm text-text-secondary">{detail}</p> : null}
    </article>
  );
}

export default MetricCard;