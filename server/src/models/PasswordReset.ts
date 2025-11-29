import { Schema, model } from 'mongoose';

const PasswordResetSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  token: { type: String, required: true },
  expiresAt: { type: Date, required: true },
});

export default model('PasswordReset', PasswordResetSchema);