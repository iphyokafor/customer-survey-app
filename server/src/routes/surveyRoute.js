import express from 'express';
import Survey from '../controllers/surveyController';
import verify from '../middleware/verifyToken';
import isAdmin from '../middleware/isAdmin';

const router = express.Router();

router.post('/survey', verify, isAdmin, Survey.addSurvey);
router.get('/survey', Survey.getAllSurvey);
router.get('/survey/:surveyId', Survey.getOneSurvey);
router.put('/survey/:surveyId', Survey.updateSurvey);
router.delete('/survey/:surveyId', Survey.deleteSurvey);

export default router;