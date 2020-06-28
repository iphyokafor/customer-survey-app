import mongoose from 'mongoose';

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
    role: {
      type: String,
      role: ['admin', 'customer'],
      default: 'customer'
    }
}, { timestamps: true });

userSchema.methods.toJSON =function () {
  const user = this
  const userObject = user.toObject()

delete userObject.password

  return userObject
}

export default mongoose.model('User', userSchema);