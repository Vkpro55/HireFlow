import { useState } from 'react';
import { Briefcase, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button.jsx';
import Checkbox from '../components/ui/Checkbox.jsx';
import Logo from '../components/ui/Logo.jsx';
import PasswordField from '../components/ui/PasswordField.jsx';
import RoleCard from '../components/ui/RoleCard.jsx';
import TextField from '../components/ui/TextField.jsx';
import { useAuth } from '../hooks/useAuth.jsx';

const TAGLINES = {
  candidate: 'Join HireFlow and take the next step in your hiring journey.',
  recruiter: 'Join HireFlow and start hiring the right people.',
};

function SignupPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [role, setRole] = useState('candidate');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');

    const form = new FormData(event.currentTarget);
    const name = String(form.get('name') || '').trim();
    const email = String(form.get('email') || '').trim();
    const password = String(form.get('password') || '');
    const confirmPassword = String(form.get('confirmPassword') || '');
    const remember = form.get('remember') === 'on';

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await register({ name, email, password, role, remember });
      navigate(response.user.role === 'recruiter' ? '/recruiter' : '/candidate');
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Unable to create your account');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-bg-primary px-6 pt-16 pb-12 md:p-12 lg:px-20 lg:py-16">
      <div className="flex w-full max-w-[480px] flex-col items-center gap-8">
        <Logo />

        <div className="flex w-full flex-col items-center gap-3">
          <h1 className="w-full text-center font-display-sm text-display-sm font-bold leading-[48px] tracking-[-1.5px] text-text-primary md:font-display-lg md:text-display-lg md:leading-[60px]">
            Create your account
          </h1>
          <p className="text-center font-body-base text-body-base font-normal leading-6 text-text-secondary md:font-body-lg md:text-body-lg md:leading-7">
            {TAGLINES[role]}
          </p>
        </div>

        <form className="flex w-full flex-col gap-6" onSubmit={handleSubmit}>
          <div className="flex w-full gap-4">
            <RoleCard
              selected={role === 'candidate'}
              onSelect={() => setRole('candidate')}
              icon={User}
              title="Candidate"
              description="I'm looking for new opportunities."
            />
            <RoleCard
              selected={role === 'recruiter'}
              onSelect={() => setRole('recruiter')}
              icon={Briefcase}
              title="Recruiter"
              description="I'm hiring top-tier talent."
            />
          </div>

          <div className="flex w-full flex-col gap-4">
            <TextField
              id="signup-name"
              name="name"
              label="Full Name"
              placeholder="Jane Doe"
              autoComplete="name"
            />
            <TextField
              id="signup-email"
              name="email"
              label="Email"
              type="email"
              placeholder="jane@company.com"
              autoComplete="email"
            />
            <PasswordField
              id="signup-password"
              name="password"
              label="Password"
              autoComplete="new-password"
            />
            <PasswordField
              id="signup-confirm-password"
              name="confirmPassword"
              label="Confirm Password"
              autoComplete="new-password"
            />
          </div>

          <Checkbox id="signup-remember-me" name="remember" label="Remember me" />

          {error ? (
            <p className="font-body-sm text-body-sm text-center text-text-primary">{error}</p>
          ) : null}

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Creating account...' : 'Create account'}
          </Button>
        </form>

        <p className="w-full text-center font-body-sm text-body-sm font-normal leading-5 text-text-secondary">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-body-sm-medium font-medium text-text-primary underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;
