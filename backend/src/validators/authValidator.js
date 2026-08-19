const EMAIL_PATTERN = /^\S+@\S+\.\S+$/;

export function validateRegister(req, res, next) {
  const { name, email, password } = req.body;

  if (!name?.trim()) {
    return res.status(400).json({ message: 'Name is required' });
  }

  if (!email?.trim() || !EMAIL_PATTERN.test(email)) {
    return res.status(400).json({ message: 'Valid email is required' });
  }

  if (!password || password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters' });
  }

  next();
}

export function validateLogin(req, res, next) {
  const { email, password } = req.body;

  if (!email?.trim() || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  next();
}
