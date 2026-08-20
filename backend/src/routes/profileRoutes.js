import { Router } from 'express';
import { authorize, protect } from '../middleware/auth.js';
import { getProfile, listSavedJobs, toggleSavedJob, updateProfile } from '../controllers/profileController.js';
import { validateProfileUpdate } from '../validators/profileValidator.js';

const router = Router();
router.use(protect);
router.get('/', getProfile);
router.put('/', validateProfileUpdate, updateProfile);
router.get('/saved-jobs', authorize('candidate'), listSavedJobs);
router.patch('/saved-jobs/:jobId', authorize('candidate'), toggleSavedJob);
export default router;