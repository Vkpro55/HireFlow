const EMAIL_PATTERN = /^\S+@\S+\.\S+$/;

function validateRememberValue(remember) {
  return remember === undefined || typeof remember === 'boolean';
}

export function validateRegister(req, res, next) {
  const { name, email, password, remember } = req.body;

  if (!name?.trim()) {
    return res.status(400).json({ message: 'Name is required' });
  }

  if (!email?.trim() || !EMAIL_PATTERN.test(email)) {
    return res.status(400).json({ message: 'Valid email is required' });
  }

  if (!password || password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters' });
  }

  if (!validateRememberValue(remember)) {
    return res.status(400).json({ message: 'Remember me must be a boolean' });
  }

  next();
}

export function validateLogin(req, res, next) {
  const { email, password, remember } = req.body;

  if (!email?.trim() || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  if (!validateRememberValue(remember)) {
    return res.status(400).json({ message: 'Remember me must be a boolean' });
  }

  next();
}
