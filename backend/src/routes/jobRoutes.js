import { Router } from 'express';
import { authorize, protect } from '../middleware/auth.js';
import {
  createJob,
  deleteJob,
  getJob,
  listJobs,
  listMyJobs,
  updateJob,
  updateJobStatus,
} from '../controllers/jobController.js';
import { validateCreateJob, validateJobStatus, validateUpdateJob } from '../validators/jobValidator.js';

const router = Router();

router.get('/', listJobs);
router.get('/mine', protect, authorize('recruiter'), listMyJobs);
router.get('/:id', getJob);
router.post('/', protect, authorize('recruiter'), validateCreateJob, createJob);
router.put('/:id', protect, authorize('recruiter'), validateUpdateJob, updateJob);
router.delete('/:id', protect, authorize('recruiter'), deleteJob);
router.patch('/:id/status', protect, authorize('recruiter'), validateJobStatus, updateJobStatus);

export default router;