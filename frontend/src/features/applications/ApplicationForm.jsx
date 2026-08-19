import { useState } from 'react';
import Button from '../../components/ui/Button.jsx';
import TextAreaField from '../../components/ui/TextAreaField.jsx';
import TextField from '../../components/ui/TextField.jsx';

function ApplicationForm({ isSubmitting, onSubmit, onCancel }) {
  const [values, setValues] = useState({ resumeUrl: '', coverLetter: '' });

  function updateField(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit({
      resumeUrl: values.resumeUrl.trim(),
      coverLetter: values.coverLetter.trim(),
    });
  }

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
      <TextField id="resumeUrl" label="Resume URL" value={values.resumeUrl} onChange={updateField} placeholder="https://example.com/my-resume.pdf" required />
      <TextAreaField id="coverLetter" label="Cover letter" value={values.coverLetter} onChange={updateField} placeholder="Tell the recruiter why you are a strong fit for this role." rows={7} required />
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button className="rounded-md border border-border-default px-5 py-3 font-body-base-medium text-body-base font-medium text-text-primary" type="button" onClick={onCancel}>Cancel</button>
        <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Submit application'}</Button>
      </div>
    </form>
  );
}

export default ApplicationForm;
