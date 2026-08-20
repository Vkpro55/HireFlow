import ApplicationStatusBadge from '../applications/ApplicationStatusBadge.jsx';

const STATUSES = ['applied', 'shortlisted', 'interview-scheduled', 'selected', 'rejected'];

function HiringStats({ values }) {
  return (
    <div className="flex flex-col gap-4">
      {STATUSES.map((status) => {
        const value = values[status === 'interview-scheduled' ? 'interviewScheduled' : status] || 0;
        const total = Object.values(values).reduce((sum, count) => sum + count, 0);
        const width = total ? `${Math.max((value / total) * 100, value ? 8 : 0)}%` : '0%';
        return (
          <div key={status} className="grid grid-cols-[auto_1fr_auto] items-center gap-3">
            <ApplicationStatusBadge status={status} />
            <div className="h-2 overflow-hidden rounded-full bg-bg-primary"><div className="h-full rounded-full bg-bg-dark" style={{ width }} /></div>
            <span className="font-body-sm-medium text-body-sm font-medium text-text-primary">{value}</span>
          </div>
        );
      })}
    </div>
  );
}

export default HiringStats;