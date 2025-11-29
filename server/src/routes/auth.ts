import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import User from '../models/User';
import PasswordReset from '../models/PasswordReset';

const r = Router();
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
const sign = (u: any) => jwt.sign({ sub:u._id, role:u.role, employeeRole:u.employeeRole, name:u.name }, process.env.JWT_SECRET!, { expiresIn:'7d' });

r.post('/signup', async (req,res)=>{
  const { name,email,password,role,employeeRole } = req.body;
  if (!PASSWORD_REGEX.test(password)) return res.status(400).json({error:'Weak password'});
  const passwordHash = await bcrypt.hash(password,10);
  const user = await User.create({ name,email,passwordHash,role,employeeRole });
  res.json({ token:sign(user), user:{ id:user._id, name:user.name, role:user.role, employeeRole:user.employeeRole } });
});

r.post('/login', async (req,res)=>{
  const { email,password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password,user.passwordHash))) return res.status(401).json({error:'Invalid credentials'});
  res.json({ token:sign(user), user:{ id:user._id, name:user.name, role:user.role, employeeRole:user.employeeRole } });
});

r.post('/forgot-password', async (req,res)=>{
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.json({ message:'If account exists, reset link sent.' });
  const token = crypto.randomBytes(32).toString('hex');
  await PasswordReset.create({ userId:user._id, token, expiresAt:Date.now()+3600_000 });
  console.log('Reset link:', `${process.env.FRONTEND_URL}/reset-password/${token}`);
  res.json({ message:'Reset link sent.' });
});

r.post('/reset-password/:token', async (req,res)=>{
  const { password } = req.body;
  const reset = await PasswordReset.findOne({ token:req.params.token });
  if (!reset || reset.expiresAt < Date.now()) return res.status(400).json({error:'Invalid or expired token'});
  if (!PASSWORD_REGEX.test(password)) return res.status(400).json({error:'Weak password'});
  const user = await User.findById(reset.userId);
  user.passwordHash = await bcrypt.hash(password,10);
  await user.save(); await reset.deleteOne();
  res.json({ message:'Password updated successfully' });
});

r.post('/change-password', async (req:any,res)=>{
  const { currentPassword,newPassword } = req.body;
  const user = await User.findById(req.user.sub);
  if (!user) return res.status(404).json({error:'User not found'});
  const valid = await bcrypt.compare(currentPassword,user.passwordHash);
  if (!valid) return res.status(400).json({error:'Current password incorrect'});
  if (!PASSWORD_REGEX.test(newPassword)) return res.status(400).json({error:'Weak password'});
  user.passwordHash = await bcrypt.hash(newPassword,10);
  await user.save();
  res.json({ message:'Password updated successfully' });
});

export default r;