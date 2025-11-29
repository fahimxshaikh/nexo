import { Schema, model } from 'mongoose';

const AdminAuditSchema = new Schema({
  action: String,
  targetUserId: { type: Schema.Types.ObjectId, ref: 'User' },
  targetEmail: String,
  performedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  performedByName: String,
  details: String,
  at: { type: Date, default: Date.now },
});

export default model('AdminAudit', AdminAuditSchema);