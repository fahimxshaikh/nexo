import jwt from 'jsonwebtoken';

export function requireAuth(req: any, res: any, next: any) {
  const hdr = req.headers.authorization || '';
  const token = hdr.startsWith('Bearer ') ? hdr.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET!);
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

export function allowRoles({ admin=false, maker=false, checker=false }={}) {
  return (req: any, res: any, next: any) => {
    const u = req.user;
    const isAdmin = admin && u.role === 'Admin';
    const isMaker = maker && u.role === 'Employee' && u.employeeRole === 'Maker';
    const isChecker = checker && u.role === 'Employee' && u.employeeRole === 'Checker';
    if (isAdmin || isMaker || isChecker) return next();
    return res.status(403).json({ error: 'Forbidden' });
  };
}