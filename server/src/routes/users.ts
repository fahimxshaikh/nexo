import { Router } from 'express';
import { requireAuth, allowRoles } from '../middleware/auth';
import User from '../models/User';
import { logAudit } from '../utils/logAudit';

const r = Router();

r.get('/', requireAuth, allowRoles({admin:true}), async (req,res)=>{
  const users = await User.find().select('-passwordHash');
  res.json({ data:users });
});

r.post('/', requireAuth, allowRoles({admin:true}), async (req,res)=>{
  const user = await User.create({ ...req.body, passwordHash:'TEMP' });
  await logAudit({ action:'CreateUser', targetUser:user, performedBy:req.user, details:`Created ${user.name}` });
  res.json({ data:user });
});

r.put('/:id', requireAuth, allowRoles({admin:true}), async (req,res)=>{
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new:true }).select('-passwordHash');
  await logAudit({ action:'UpdateUser', targetUser:user, performedBy:req.user, details:`Updated ${user.name}` });
  res.json({ data:user });
});

r.post('/:id/deactivate', requireAuth, allowRoles({admin:true}), async (req,res)=>{
  const user = await User.findByIdAndUpdate(req.params.id, { active:false }, { new:true });
  await logAudit({ action:'DeactivateUser', targetUser:user, performedBy:req.user, details:`Deactivated ${user.name}` });
  res.json({ data:user });
});

r.post('/:id/activate', requireAuth, allowRoles({admin:true}), async (req,res)=>{
  const

r.post('/:id/activate', requireAuth, allowRoles({admin:true}), async (req,res)=>{
  const user = await User.findByIdAndUpdate(req.params.id, { active:true }, { new:true });
  await logAudit({ action:'ActivateUser', targetUser:user, performedBy:req.user, details:`Activated ${user.name}` });
  res.json({ data:user });
});

export default r;