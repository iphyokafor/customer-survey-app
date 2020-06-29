import mongoose from 'mongoose';

const Schema = mongoose;

const surveySchema = mongoose.Schema(
	{
		admin: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
		survey_question: String,
		reply: String,
	},
	{ timestamps: true }
);

export default mongoose.model('Survey', surveySchema);
