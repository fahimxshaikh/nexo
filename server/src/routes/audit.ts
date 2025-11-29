import { Router } from 'express';
import { requireAuth, allowRoles } from '../middleware/auth';
import AdminAudit from '../models/AdminAudit';
import Invoice from '../models/Invoice';
import { Parser } from 'json2csv';
import ExcelJS from 'exceljs';

const r = Router();

r.get('/recent', requireAuth, allowRoles({admin:true}), async (req,res)=>{
  const logs = await AdminAudit.find().sort({at:-1}).limit(5).lean();
  res.json({ data:logs });
});

r.get('/admin/export/:format', requireAuth, allowRoles({admin:true}), async (req,res)=>{
  const logs = await AdminAudit.find().lean();
  if(req.params.format==='csv'){
    const parser = new Parser();
    const csv = parser.parse(logs);
    res.header('Content-Type','text/csv');
    res.attachment('admin_audit.csv');
    return res.send(csv);
  }
  if(req.params.format==='xlsx'){
    const wb = new ExcelJS.Workbook();
    const ws = wb.addWorksheet('AdminAudit');
    ws.columns = Object.keys(logs[0]||{}).map(k=>({header:k,key:k}));
    logs.forEach(l=>ws.addRow(l));
    res.header('Content-Type','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.attachment('admin_audit.xlsx');
    await wb.xlsx.write(res);
    return res.end();
  }
});

export default r;