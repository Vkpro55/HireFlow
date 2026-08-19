import { useState } from 'react';
import Button from '../../components/ui/Button.jsx';
import SelectField from '../../components/ui/SelectField.jsx';
import TextAreaField from '../../components/ui/TextAreaField.jsx';
import TextField from '../../components/ui/TextField.jsx';

const EMPLOYMENT_TYPES = [
  { value: '', label: 'Select employment type' },
  { value: 'full-time', label: 'Full-time' },
  { value: 'part-time', label: 'Part-time' },
  { value: 'contract', label: 'Contract' },
  { value: 'internship', label: 'Internship' },
];

function toDateInputValue(value) {
  return value ? new Date(value).toISOString().slice(0, 10) : '';
}

function getInitialValues(job) {
  return {
    title: job?.title || '',
    companyName: job?.companyName || '',
    description: job?.description || '',
    employmentType: job?.employmentType || '',
    experienceRequired: job?.experienceRequired || '',
    salaryMin: job?.salaryRange?.min ?? '',
    salaryMax: job?.salaryRange?.max ?? '',
    location: job?.location || '',
    skills: job?.skills?.join(', ') || '',
    deadline: toDateInputValue(job?.deadline),
  };
}

function JobForm({ job, isSubmitting, onSubmit, onCancel }) {
  const [values, setValues] = useState(() => getInitialValues(job));

  function updateField(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit({
      title: values.title.trim(),
      companyName: values.companyName.trim(),
      description: values.description.trim(),
      employmentType: values.employmentType,
      experienceRequired: values.experienceRequired.trim(),
      salaryRange: {
        min: Number(values.salaryMin),
        max: Number(values.salaryMax),
        currency: 'USD',
      },
      location: values.location.trim(),
      skills: values.skills.split(',').map((skill) => skill.trim()).filter(Boolean),
      deadline: values.deadline,
    });
  }

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
      <div className="grid gap-5 md:grid-cols-2">
        <TextField id="title" label="Job title" value={values.title} onChange={updateField} placeholder="Senior Product Designer" required />
        <TextField id="companyName" label="Company name" value={values.companyName} onChange={updateField} placeholder="HireFlow Labs" required />
        <SelectField id="employmentType" label="Employment type" value={values.employmentType} onChange={updateField} options={EMPLOYMENT_TYPES} required />
        <TextField id="experienceRequired" label="Experience required" value={values.experienceRequired} onChange={updateField} placeholder="3+ years" required />
        <TextField id="location" label="Location" value={values.location} onChange={updateField} placeholder="Remote or New York" required />
        <TextField id="deadline" label="Application deadline" type="date" value={values.deadline} onChange={updateField} required />
        <TextField id="salaryMin" label="Minimum salary (USD)" type="number" value={values.salaryMin} onChange={updateField} placeholder="60000" required />
        <TextField id="salaryMax" label="Maximum salary (USD)" type="number" value={values.salaryMax} onChange={updateField} placeholder="90000" required />
      </div>

      <TextField id="skills" label="Required skills" value={values.skills} onChange={updateField} placeholder="React, Figma, User research" required />
      <TextAreaField id="description" label="Job description" value={values.description} onChange={updateField} placeholder="Describe the role, responsibilities, and what success looks like." required />

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button className="rounded-md border border-border-default px-5 py-3 font-body-base-medium text-body-base font-medium text-text-primary" type="button" onClick={onCancel}>
          Cancel
        </button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : job ? 'Save changes' : 'Create job'}
        </Button>
      </div>
    </form>
  );
}

export default JobForm;