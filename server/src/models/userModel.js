import mongoose from 'mongoose';

const Schema = mongoose;
const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        min: 2,
        max: 100
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 100
  },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 150
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 1024
    },
    companyName: {
      type: String,
      required: false,
      min: 2,
      max: 100
  },
    role: {
      type: String,
      role: ['admin', 'customer'],
      default: 'customer'
    },
    // userResponse: [{
    //   type: Schema.Types.ObjectId,
    //   ref: 'Feedback',
    //   required: false
    // }]

}, { timestamps: true });

userSchema.methods.toJSON =function () {
  const user = this
  const userObject = user.toObject()

delete userObject.password

  return userObject
}

export default mongoose.model('User', userSchema);