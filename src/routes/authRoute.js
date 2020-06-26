import express from 'express';
import User from '../controllers/auth';
import Users from '../controllers/userController';

const router = express.Router();

router.post('/register', User.register);
router.post('/login', User.login);
// router.get('/users', Users.getAllUsers);

export default router;