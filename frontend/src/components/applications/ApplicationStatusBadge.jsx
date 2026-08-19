const STATUS_LABELS = {
  applied: 'Applied',
  shortlisted: 'Shortlisted',
  'interview-scheduled': 'Interview scheduled',
  rejected: 'Rejected',
  selected: 'Selected',
};

const STATUS_STYLES = {
  applied: 'bg-blue-100 text-blue-800',
  shortlisted: 'bg-amber-100 text-amber-800',
  'interview-scheduled': 'bg-purple-100 text-purple-800',
  rejected: 'bg-red-100 text-red-800',
  selected: 'bg-green-100 text-green-800',
};

function ApplicationStatusBadge({ status }) {
  return (
    <span className={`inline-flex rounded-full px-3 py-1 font-body-xs text-body-xs ${STATUS_STYLES[status] || 'bg-gray-100 text-gray-700'}`}>
      {STATUS_LABELS[status] || status}
    </span>
  );
}

export { STATUS_LABELS };
export default ApplicationStatusBadge;
