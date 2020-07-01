import {Router} from 'express';
import authRoute from './authRoute';
import usersRoute from './userRoute';
import surveyRoute from './surveyRoute';
import feedbackRoute from './feedbackRoute';

const router = Router();

router.use('/api/auth', authRoute);
router.use('/', usersRoute);
router.use('/', surveyRoute);
router.use('/', feedbackRoute);

export default router;