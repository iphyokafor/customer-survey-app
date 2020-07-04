import Feedback from '../models/feedbackModel';

export default {
  addFeedback: async(req, res) => {
    try {
      const feedback = new Feedback({
          ...req.body,
          customer: req.user._id,
      });

          const savedFeedback = await feedback.save();
          return res.status(201).json({
              success: true,
              message: 'Feedback response has been added successfully',
              savedFeedback
          });

      } catch (err) {
          res.json({
              success: false,
              message: err.message
          });
      }
  },

  getAllFeedback: async(req, res) => {
      try {
          const getFeedback = await Feedback.find({}).sort({createdAt: -1});
          return res.json({
              success: true,
              message: 'View all  Feedback responses',
              getFeedback
          });

      } catch (err) {
          return res.json({
              success: false,
              message: err.message
          });
      }
  },

  getOneFeedback: async(req, res) => {
    try {
        const feedback = await Feedback.findById(req.params.feedbackId);
        if (!feedback){
          return res.json({
            success: false,
            message: 'feedback not found'
          })
        }
        res.json({
          success: true,
          data: feedback
        });

    } catch (err) {
        res.json({
            success: false,
            message: err.message
        });
    }
},
deleteFeedback: async(req, res) => {
    try {
        const removedFeedback = await Feedback.findByIdAndDelete({ _id: req.params.feedbackId });
        if(!removedFeedback){
          return res.json({
            success: false,
            message: "Feedback doesn't exist"
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
updateFeedback: async(req, res) => {
    try {
        const updatedFeedback = await Feedback.findByIdAndUpdate({ _id: req.params.feedbackId }, { $set: { surveyId: req.body.surveyId, customerReply: req.body.customerReply} });
        if (!updatedFeedback) {
          return res.json({
            success: false,
            message: 'Feedback not found'
          })
        }
        res.json({
          success: true,
          message: 'Feedback updated successfully'
        });

    } catch (err) {
        res.json({
            success: false,
            message: err.message
        });
    }
}
}
