import mongoose from 'mongoose';

const Schema = mongoose;

const surveySchema = mongoose.Schema(
	{
		admin: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
		survey_question: {
      type: String
    },
		reply: [
      {
      type: String,
    }
  ],
	},
	{ timestamps: true }
);

export default mongoose.model('Survey', surveySchema);
