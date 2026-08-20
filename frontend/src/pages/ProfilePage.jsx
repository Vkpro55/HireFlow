import { useEffect, useState } from 'react';
import { getProfile, updateProfile } from '../api/profile.js';
import ProfileForm from '../features/profile/ProfileForm.jsx';

function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  useEffect(() => { getProfile().then(setProfile).catch((requestError) => setError(requestError.response?.data?.message || 'Unable to load profile')).finally(() => setIsLoading(false)); }, []);
  async function saveProfile(values) { try { setIsSubmitting(true); setError(''); setMessage(''); setProfile(await updateProfile(values)); setMessage('Profile saved successfully.'); } catch (requestError) { setError(requestError.response?.data?.message || 'Unable to save profile'); } finally { setIsSubmitting(false); } }
  return <section className="mx-auto flex max-w-4xl flex-col gap-7"><div><p className="mb-2 font-body-sm text-body-sm uppercase tracking-[1px] text-text-muted">Account</p><h1 className="font-display-sm text-display-sm leading-none text-text-primary">Your profile</h1><p className="mt-4 font-body-base text-body-base text-text-secondary">Keep your professional information current.</p></div><div className="border border-border-light bg-bg-white p-5 sm:p-8">{isLoading ? <p className="py-8 text-center font-body-base text-body-base text-text-secondary">Loading profile...</p> : null}{error ? <p className="mb-5 border border-red-200 bg-red-50 px-4 py-3 font-body-sm text-body-sm text-red-800">{error}</p> : null}{message ? <p className="mb-5 border border-green-200 bg-green-50 px-4 py-3 font-body-sm text-body-sm text-green-800">{message}</p> : null}{!isLoading && profile ? <ProfileForm profile={profile} isSubmitting={isSubmitting} onSubmit={saveProfile} /> : null}</div></section>;
}
export default ProfilePage;
