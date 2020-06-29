import express from 'express';
import Users from '../controllers/userController';
import verify from '../middleware/verifyToken';
import isAdmin from '../middleware/isAdmin';

const router = express.Router();

router.get('/users', verify, isAdmin, Users.getAllUsers);

export default router;