// server/src/routes/invoices.ts
import { Router } from 'express';
import { requireAuth, allowRoles } from '../middleware/auth';
import * as Invoices from '../controllers/invoices';

const r = Router();

/**
 * List all invoices
 * Accessible to Admin, Maker, Checker
 */
r.get('/', requireAuth, allowRoles({ admin: true, maker: true, checker: true }), Invoices.list);

/**
 * Get a single invoice by ID
 * Accessible to Admin, Maker, Checker
 */
r.get('/:id', requireAuth, allowRoles({ admin: true, maker: true, checker: true }), Invoices.get);

/**
 * Create a new invoice
 * Accessible to Admin and Maker
 */
r.post('/', requireAuth, allowRoles({ admin: true, maker: true }), Invoices.create);

/**
 * Submit an invoice (Maker moves Draft → Pending)
 * Accessible to Admin and Maker
 */
r.post('/:id/submit', requireAuth, allowRoles({ admin: true, maker: true }), Invoices.submit);

/**
 * Approve an invoice (Checker mandatory comment)
 * Accessible to Admin and Checker
 */
r.post('/:id/approve', requireAuth, allowRoles({ admin: true, checker: true }), Invoices.approve);

/**
 * Reject an invoice (Checker mandatory comment)
 * Accessible to Admin and Checker
 */
r.post('/:id/reject', requireAuth, allowRoles({ admin: true, checker: true }), Invoices.reject);

/**
 * Edit invoice details (before submission)
 * Accessible to Admin and Maker
 */
r.put('/:id', requireAuth, allowRoles({ admin: true, maker: true }), Invoices.edit);

/**
 * Delete invoice (Admin only)
 */
r.delete('/:id', requireAuth, allowRoles({ admin: true }), Invoices.remove);

export default r;
