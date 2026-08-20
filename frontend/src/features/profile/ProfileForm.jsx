import { useEffect, useState } from 'react';
import Button from '../../components/ui/Button.jsx';
import TextAreaField from '../../components/ui/TextAreaField.jsx';
import TextField from '../../components/ui/TextField.jsx';
import ProfileListField from '../../components/profile/ProfileListField.jsx';

function listValue(value) { return Array.isArray(value) ? value.join(', ') : ''; }
function ProfileForm({ profile, isSubmitting, onSubmit }) {
  const [values, setValues] = useState({ name: '', headline: '', bio: '', skills: '', experience: '', education: '' });
  useEffect(() => { if (profile) setValues({ name: profile.name || '', headline: profile.headline || '', bio: profile.bio || '', skills: listValue(profile.skills), experience: listValue(profile.experience), education: listValue(profile.education) }); }, [profile]);
  function updateField(event) { setValues((current) => ({ ...current, [event.target.name]: event.target.value })); }
  function submit(event) { event.preventDefault(); onSubmit({ ...values, skills: values.skills.split(',').map((item) => item.trim()).filter(Boolean), experience: values.experience.split(',').map((item) => item.trim()).filter(Boolean), education: values.education.split(',').map((item) => item.trim()).filter(Boolean) }); }
  return <form className="flex flex-col gap-5" onSubmit={submit}>
    <div className="grid gap-5 md:grid-cols-2"><TextField id="name" label="Full name" value={values.name} onChange={updateField} required /><TextField id="headline" label="Professional headline" value={values.headline} onChange={updateField} placeholder="Product designer" /></div>
    <TextAreaField id="bio" label="About you" value={values.bio} onChange={updateField} placeholder="Share a short introduction." rows={5} />
    <ProfileListField label="Skills" value={values.skills} onChange={updateField} placeholder="React, Research, Figma" />
    <ProfileListField label="Experience" value={values.experience} onChange={updateField} placeholder="Product Designer at Acme" />
    <ProfileListField label="Education" value={values.education} onChange={updateField} placeholder="BSc Computer Science" />
    <div className="flex justify-end"><div className="w-full sm:w-44"><Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Saving...' : 'Save profile'}</Button></div></div>
  </form>;
}
export default ProfileForm;
