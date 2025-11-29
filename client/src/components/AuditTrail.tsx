// client/src/components/AuditTrail.tsx
import React from 'react';

type AuditEvent = {
  action: 'Created' | 'Submitted' | 'Approved' | 'Rejected' | 'Edited' | string;
  byName: string;
  role: 'Admin' | 'Maker' | 'Checker' | string;
  comment?: string;
  at: string | Date;
};

export default function AuditTrail({ audit }: { audit: AuditEvent[] }) {
  if (!audit || audit.length === 0) {
    return (
      <div className="mt-6 rounded border bg-white p-4">
        <h3 className="text-base font-semibold">Audit Trail</h3>
        <p className="mt-3 text-sm text-slate-600">No audit events yet.</p>
      </div>
    );
  }

  const iconFor = (action: string) => {
    switch (action) {
      case 'Created':
        return '📝';
      case 'Submitted':
        return '📤';
      case 'Approved':
        return '✅';
      case 'Rejected':
        return '❌';
      case 'Edited':
        return '✏️';
      default:
        return '🔹';
    }
  };

  const colorFor = (action: string) => {
    switch (action) {
      case 'Approved':
        return 'text-green-700';
      case 'Rejected':
        return 'text-red-700';
      case 'Submitted':
        return 'text-blue-700';
      case 'Created':
        return 'text-slate-800';
      case 'Edited':
        return 'text-amber-700';
      default:
        return 'text-slate-800';
    }
  };

  const fmt = (at: string | Date) =>
    new Date(at).toLocaleString(undefined, {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });

  return (
    <div className="mt-6 rounded border bg-white p-4">
      <h3 className="text-base font-semibold">Audit Trail</h3>
      <ul className="mt-3 space-y-3">
        {audit.map((a, i) => (
          <li key={i} className="rounded border p-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg">{iconFor(a.action)}</span>
                <span className={`font-medium ${colorFor(a.action)}`}>{a.action}</span>
                <span className="text-slate-500">by {a.byName}</span>
                <span className="rounded bg-slate-100 px-2 py-0.5 text-xs text-slate-700">{a.role}</span>
              </div>
              <time className="text-xs text-slate-500">{fmt(a.at)}</time>
            </div>
            {a.comment && (
              <p className="mt-2 text-sm text-slate-700">
                <span className="font-medium">Comment:</span> {a.comment}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}