import { Router } from 'express';
import { login, logout, refresh, register } from '../controllers/authController.js';
import { validateLogin, validateRegister } from '../validators/authValidator.js';

const router = Router();

router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);
router.post('/refresh', refresh);
router.post('/logout', logout);

export default router;
