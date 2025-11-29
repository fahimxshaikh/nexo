import AdminAudit from '../models/AdminAudit';

export async function logAudit({ action, targetUser, performedBy, details }: any) {
  await AdminAudit.create({
    action,
    targetUserId: targetUser._id,
    targetEmail: targetUser.email,
    performedBy: performedBy.sub,
    performedByName: performedBy.name,
    details,
  });
}