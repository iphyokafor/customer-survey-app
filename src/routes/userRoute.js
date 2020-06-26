import express from 'express';
import Users from '../controllers/userController';

const router = express.Router();

router.get('/users', Users.getAllUsers);

export default router;