import { EMPLOYMENT_TYPES } from '../constants/jobs.js';

function isValidDate(value) {
  return value && !Number.isNaN(new Date(value).getTime());
}

function validateJobFields(body, { partial = false } = {}) {
  const errors = [];

  if (!partial || body.title !== undefined) {
    if (!body.title?.trim()) errors.push('Job title is required');
  }
  if (!partial || body.companyName !== undefined) {
    if (!body.companyName?.trim()) errors.push('Company name is required');
  }
  if (!partial || body.description !== undefined) {
    if (!body.description?.trim()) errors.push('Job description is required');
  }
  if (!partial || body.employmentType !== undefined) {
    if (!EMPLOYMENT_TYPES.includes(body.employmentType)) {
      errors.push(`Employment type must be one of: ${EMPLOYMENT_TYPES.join(', ')}`);
    }
  }
  if (!partial || body.experienceRequired !== undefined) {
    if (!body.experienceRequired?.trim()) errors.push('Experience required is required');
  }
  if (!partial || body.location !== undefined) {
    if (!body.location?.trim()) errors.push('Location is required');
  }
  if (!partial || body.skills !== undefined) {
    if (!Array.isArray(body.skills) || body.skills.length === 0 || body.skills.some((skill) => !String(skill).trim())) {
      errors.push('At least one required skill is needed');
    }
  }
  if (!partial || body.deadline !== undefined) {
    if (!isValidDate(body.deadline) || new Date(body.deadline) <= new Date()) {
      errors.push('Application deadline must be a future date');
    }
  }
  if (!partial || body.salaryRange !== undefined) {
    const salary = body.salaryRange;
    if (!salary || !Number.isFinite(Number(salary.min)) || !Number.isFinite(Number(salary.max))) {
      errors.push('Salary range must include numeric min and max values');
    } else if (Number(salary.min) < 0 || Number(salary.max) < Number(salary.min)) {
      errors.push('Salary range values are invalid');
    }
  }

  return errors;
}

export function validateCreateJob(req, res, next) {
  const errors = validateJobFields(req.body);
  if (errors.length) return res.status(400).json({ message: errors[0], errors });
  next();
}

export function validateUpdateJob(req, res, next) {
  const errors = validateJobFields(req.body, { partial: true });
  if (errors.length) return res.status(400).json({ message: errors[0], errors });
  next();
}

export function validateJobStatus(req, res, next) {
  if (!['open', 'closed'].includes(req.body.status)) {
    return res.status(400).json({ message: 'Status must be open or closed' });
  }
  next();
}