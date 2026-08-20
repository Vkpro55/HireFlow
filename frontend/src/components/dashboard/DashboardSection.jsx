function DashboardSection({ title, action, children }) {
  return (
    <section className="border border-border-light bg-bg-white p-5 sm:p-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-body-lg-semibold text-body-lg-semibold font-semibold text-text-primary">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

export default DashboardSection;