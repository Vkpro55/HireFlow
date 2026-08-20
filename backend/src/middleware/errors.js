export function notFound(req, res) {
  return res.status(404).json({
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
}

export function errorHandler(error, req, res, next) {
  if (res.headersSent) return next(error);

  if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
    return res.status(400).json({ message: 'Request body contains invalid JSON' });
  }

  if (error.name === 'CastError') {
    return res.status(400).json({ message: 'Invalid resource identifier' });
  }

  if (error.name === 'ValidationError') {
    const errors = Object.values(error.errors).map(({ message }) => message);
    return res.status(400).json({ message: errors[0] || 'Validation failed', errors });
  }

  if (error.code === 11000) {
    return res.status(409).json({ message: 'A resource with these values already exists' });
  }

  const status = Number.isInteger(error.status) ? error.status : 500;
  const message = status >= 500 ? 'Internal server error' : error.message || 'Request failed';

  if (status >= 500) console.error(error);
  return res.status(status).json({ message });
}
