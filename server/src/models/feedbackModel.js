import mongoose from 'mongoose';

const Schema = mongoose;

const feedbackSchema = mongoose.Schema(
	{
		customer: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
		surveyId: {
      type: Schema.Types.ObjectId,
      ref: 'Survey',
    },
		customerReply: {
      type: String,
    }
	},
	{ timestamps: true }
);

export default mongoose.model('Feedback', feedbackSchema);
