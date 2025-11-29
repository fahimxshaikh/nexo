import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['Admin', 'Employee'], required: true },
  employeeRole: { type: String, enum: ['Maker', 'Checker'], required: function() { return this.role === 'Employee'; } },
  department: String,
  active: { type: Boolean, default: true },
}, { timestamps: true });

export default model('User', UserSchema);