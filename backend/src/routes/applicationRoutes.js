import { Router } from 'express';
import { authorize, protect } from '../middleware/auth.js';
import {
  applyToJob,
  listJobApplications,
  listMyApplications,
  updateApplicationStatus,
} from '../controllers/applicationController.js';
import { validateApplicationStatus, validateApply } from '../validators/applicationValidator.js';

const router = Router();

router.post('/', protect, authorize('candidate'), validateApply, applyToJob);
router.get('/my', protect, authorize('candidate'), listMyApplications);
router.get('/job/:jobId', protect, authorize('recruiter'), listJobApplications);
router.patch('/:id/status', protect, authorize('recruiter'), validateApplicationStatus, updateApplicationStatus);

export default router;