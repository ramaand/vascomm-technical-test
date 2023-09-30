import mongoose, {
  models,
  Schema,
} from 'mongoose'

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: false,
    },
    isActive: {
      type: Boolean,
      required: false,
      default: true
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
      required: false,
    },
    isDeleted: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

const User = models.User || mongoose.model('User', UserSchema);

export default User