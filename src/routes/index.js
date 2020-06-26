import {Router} from 'express';
import authRoute from './authRoute';
import usersRoute from './userRoute';

const router = Router();

router.use('/api/auth', authRoute);
router.use('/', usersRoute);

export default router;