import express from 'express';
import User from '../controllers/auth';

const router = express.Router();

router.post('/register', User.register);
router.post('/login', User.login);

export default router;
