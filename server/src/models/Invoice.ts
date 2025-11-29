import { Schema, model } from 'mongoose';

const AuditSchema = new Schema({
  action: { type: String, enum: ['Created','Submitted','Approved','Rejected','Edited'] },
  byUserId: { type: Schema.Types.ObjectId, ref: 'User' },
  byName: String,
  role: String,
  comment: String,
  at: { type: Date, default: Date.now },
}, { _id: false });

const InvoiceSchema = new Schema({
  invoiceNo: String,
  vendorName: String,
  claimAmount: Number,
  status: { type: String, enum: ['Draft','Pending','Approved','Rejected'], default: 'Draft' },
  audit: [AuditSchema],
}, { timestamps: true });

export default model('Invoice', InvoiceSchema);