import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/auth';
import userRoutes from './routes/users';
import invoiceRoutes from './routes/invoices';
import auditRoutes from './routes/audit';
import { requireAuth } from './middleware/auth';

const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/audit', auditRoutes);

mongoose.connect(process.env.MONGO_URI!).then(()=>{
  app.listen(process.env.PORT||4000, ()=>console.log('Server running'));
});