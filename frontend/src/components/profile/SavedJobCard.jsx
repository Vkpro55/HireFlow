import { Bookmark, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

function SavedJobCard({ job, onRemove }) {
  return <article className="flex min-w-0 flex-col gap-4 border border-border-light bg-bg-white p-5 sm:p-6"><div className="flex items-start justify-between gap-3"><div className="min-w-0"><p className="truncate font-body-sm text-body-sm text-text-muted">{job.companyName}</p><h2 className="mt-1 wrap-break-word font-body-lg-semibold text-body-lg-semibold font-semibold text-text-primary">{job.title}</h2></div><Bookmark size={18} className="shrink-0 fill-current" aria-hidden="true" /></div><p className="flex items-center gap-2 font-body-sm text-body-sm text-text-secondary"><MapPin size={15} aria-hidden="true" />{job.location}</p><div className="mt-auto flex flex-wrap gap-3 border-t border-border-light pt-4"><Link className="font-body-sm-medium text-body-sm font-medium text-text-primary underline" to={`/candidate/jobs/${job._id}`}>View job</Link><button className="font-body-sm text-body-sm text-text-secondary underline" type="button" onClick={() => onRemove(job._id)}>Remove</button></div></article>;
}
export default SavedJobCard;
