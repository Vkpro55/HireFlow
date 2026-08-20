import { Router } from 'express';
import { authorize, protect } from '../middleware/auth.js';
import { candidateDashboard, recruiterDashboard } from '../controllers/dashboardController.js';

const router = Router();

router.get('/candidate', protect, authorize('candidate'), candidateDashboard);
router.get('/recruiter', protect, authorize('recruiter'), recruiterDashboard);

export default router;