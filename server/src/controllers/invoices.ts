import Invoice from '../models/Invoice';

export async function create(req:any,res:any){
  const inv = await Invoice.create({
    ...req.body,
    audit:[{ action:'Created', byUserId:req.user.sub, byName:req.user.name, role:req.user.employeeRole||req.user.role }]
  });
  res.json({ data:inv });
}

export async function submit(req:any,res:any){
  const inv = await Invoice.findByIdAndUpdate(req.params.id,{
    status:'Pending',
    $push:{ audit:{ action:'Submitted', byUserId:req.user.sub, byName:req.user.name, role:req.user.employeeRole||req.user.role }}
  },{ new:true });
  res.json({ data:inv });
}

export async function approve(req:any,res:any){
  const { comment } = req.body;
  if(!comment?.trim()) return res.status(400).json({error:'Comment required'});
  const inv = await Invoice.findByIdAndUpdate(req.params.id,{
    status:'Approved',
    $push:{ audit:{ action:'Approved', byUserId:req.user.sub, byName:req.user.name, role:req.user.employeeRole||req.user.role, comment }}
  },{ new:true });
  res.json({ data:inv });
}

export async function reject(req:any,res:any){
  const { comment } = req.body;
  if(!comment?.trim()) return res.status(400).json({error:'Comment required'});
  const inv = await Invoice.findByIdAndUpdate(req.params.id,{
    status:'Rejected',
    $push:{ audit:{ action:'Rejected', byUserId:req.user.sub, byName:req.user.name, role:req.user.employeeRole||req.user.role, comment }}
  },{ new:true });
  res.json({ data:inv });
}