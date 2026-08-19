import { Link } from 'react-router-dom';
import Button from '../components/ui/Button.jsx';
import Checkbox from '../components/ui/Checkbox.jsx';
import Logo from '../components/ui/Logo.jsx';
import PasswordField from '../components/ui/PasswordField.jsx';
import TextField from '../components/ui/TextField.jsx';

function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-bg-primary px-6 pt-16 pb-12 md:p-12 lg:p-8">
      <div className="flex w-full max-w-[448px] flex-col items-center gap-7 md:gap-8 lg:gap-0">
        <div className="pb-2 md:pb-4 lg:mb-12 lg:pb-0">
          <Logo />
        </div>

        <div className="flex w-full flex-col items-center gap-3 lg:gap-4">
          <h1 className="w-full text-center font-display-sm text-display-sm font-bold leading-[48px] tracking-[-1.5px] text-text-primary md:font-display-lg md:text-display-lg md:leading-[60px]">
            Welcome back
          </h1>
          <p className="text-center font-body-base text-body-base font-normal leading-6 text-text-secondary md:font-body-lg md:text-body-lg md:leading-7">
            Sign in to continue your hiring journey.
          </p>
        </div>

        <form className="flex w-full flex-col gap-4 md:max-w-[384px] md:gap-5 lg:pt-4">
          <TextField
            id="login-email"
            label="Email"
            type="email"
            placeholder="you@company.com"
            autoComplete="username"
          />

          <div className="lg:pb-2">
            <PasswordField id="login-password" label="Password" autoComplete="current-password" />
          </div>

          <Checkbox label="Remember me" />

          <Button>Sign in</Button>
        </form>

        <p className="w-full pt-2 text-center font-body-sm text-body-sm font-normal leading-5 text-text-secondary md:pt-4">
          Don&apos;t have an account?{' '}
          <Link
            to="/signup"
            className="font-body-sm-medium font-medium text-text-primary underline"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
