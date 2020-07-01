import express from 'express';
import Feedback from '../controllers/feedbackController';
import verify from '../middleware/verifyToken';
// import isAdmin from '../middleware/isAdmin';

const router = express.Router();

router.post('/feedback', verify, Feedback.addFeedback);
router.get('/feedback', Feedback.getAllFeedback);
router.get('/feedback/:feedbackId', Feedback.getOneFeedback);
router.put('/feedback/:feedbackId', Feedback.updateFeedback);
router.delete('/feedback/:feedbackId', Feedback.deleteFeedback);

export default router;