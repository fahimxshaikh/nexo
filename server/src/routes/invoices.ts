import { Router } from 'express';
import { requireAuth, allowRoles } from '../middleware/auth';
import * as Invoices from '../controllers/invoices';

const r = Router();

r.get('/', requireAuth, Invoices.list);
r.get('/:id', requireAuth, Invoices.get);
r.post('/', requireAuth, allowRoles({admin:true,maker:true}), Invoices.create);
r.post('/:id/submit', requireAuth, allowRoles({admin:true,maker:true}), Invoices.submit);
r.post('/:id/approve', requireAuth, allowRoles({admin:true,checker:true}), Invoices.approve);
r.post('/:id/reject', requireAuth, allowRoles({admin:true,checker:true}), Invoices.reject);

export default r;