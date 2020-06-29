import Survey from '../models/surveyModel';

export default {
  addSurvey: async(req, res) => {
    try {
      const survey = new Survey({
          ...req.body,
          admin: req.user._id,
      });

          const savedSurvey = await survey.save();
          return res.status(201).json({
              success: true,
              message: 'Survey question has been added successfully',
              savedSurvey
          });

      } catch (err) {
          res.json({
              success: false,
              message: err.message
          });
      }
  },

  getAllSurvey: async(req, res) => {
      try {
          const getSurvey = await Survey.find({}).populate('admin');
          return res.json({
              success: true,
              message: 'View all  Survey questions',
              getSurvey
          });

      } catch (err) {
          return res.json({
              success: false,
              message: err.message
          });
      }
  },

  getOneSurvey: async(req, res) => {
    try {
        const survey = await Survey.findById(req.params.surveyId);
        if (!survey){
          return res.json({
            success: false,
            message: 'survey not found'
          })
        }
        res.json({
          success: true,
          data: survey
        });

    } catch (err) {
        res.json({
            success: false,
            message: err.message
        });
    }
},
deleteSurvey: async(req, res) => {
    try {
        const removedSurvey = await Survey.findByIdAndDelete({ _id: req.params.surveyId });
        if(!removedSurvey){
          return res.json({
            success: false,
            message: "Survey doesn't exist"
          })
        }
        res.json({
          success: true,
          message: 'Deleted successfully'});

    } catch (err) {
        res.json({
          success: false,
          message: err.message
        });
    }
},
updateSurvey: async(req, res) => {
    try {
        const updatedSurvey = await Survey.findByIdAndUpdate({ _id: req.params.surveyId }, { $set: { survey_question: req.body.survey_question, reply: req.body.reply} });
        if (!updatedSurvey) {
          return res.json({
            success: false,
            message: 'Survey not found'
          })
        }
        res.json({
          success: true,
          message: 'Survey updated successfully'
        });

    } catch (err) {
        res.json({
            success: false,
            message: err.message
        });
    }
}
}
