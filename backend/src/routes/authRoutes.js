import { Router } from 'express';
import { currentUser, login, logout, recruiterArea, refresh, register } from '../controllers/authController.js';
import { authorize, protect } from '../middleware/auth.js';
import { validateLogin, validateRegister } from '../validators/authValidator.js';

const router = Router();

router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);
router.post('/refresh', refresh);
router.post('/logout', logout);
router.get('/me', protect, currentUser);
router.get('/recruiter-area', protect, authorize('recruiter'), recruiterArea);

export default router;
