export function validateProfileUpdate(req, res, next) {
  const { name, headline, bio, skills, experience, education } = req.body;
  if (name !== undefined && !String(name).trim()) {
    return res.status(400).json({ message: 'Name cannot be empty' });
  }
  for (const [label, value] of [['Skills', skills], ['Experience', experience], ['Education', education]]) {
    if (value !== undefined && (!Array.isArray(value) || value.some((item) => !String(item).trim()))) {
      return res.status(400).json({ message: `${label} must be a list of non-empty values` });
    }
  }
  if (headline !== undefined && String(headline).length > 160) return res.status(400).json({ message: 'Headline is too long' });
  if (bio !== undefined && String(bio).length > 2000) return res.status(400).json({ message: 'Bio is too long' });
  next();
}