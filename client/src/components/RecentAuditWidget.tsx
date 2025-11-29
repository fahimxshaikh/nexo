// client/src/components/RecentAuditWidget.tsx
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../app/auth';

export default function RecentAuditWidget() {
  const { token } = useAuth();
  const [type, setType] = useState('All');
  const [role, setRole] = useState('All');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const { data } = useQuery({
    queryKey: ['recentAudit', type, role, from, to],
    queryFn: async () => {
      const params = new URLSearchParams({ type, role, from, to });
      const res = await fetch(`/api/audit/recent?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.json();
    },
  });

  const logs = data?.data || [];

  return (
    <div className="rounded border bg-white p-4 shadow">
      <h2 className="text-base font-semibold">Recent Audit Events</h2>

      {/* Filter controls */}
      <div className="mt-3 flex flex-wrap gap-2 text-sm">
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="rounded border px-2 py-1"
        >
          <option>All</option>
          <option>User</option>
          <option>Invoice</option>
        </select>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="rounded border px-2 py-1"
        >
          <option>All</option>
          <option>Admin</option>
          <option>Maker</option>
          <option>Checker</option>
        </select>
        <input
          type="date"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="rounded border px-2 py-1"
        />
        <input
          type="date"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="rounded border px-2 py-1"
        />
        <button
          onClick={() => {
            setType('All');
            setRole('All');
            setFrom('');
            setTo('');
          }}
          className="rounded border px-2 py-1"
        >
          Clear Filters
        </button>
      </div>

      {/* Audit events list */}
      <ul className="mt-3 space-y-2 text-sm">
        {logs.length === 0 ? (
          <li className="text-slate-600">No audit events match your filters</li>
        ) : (
          logs.map((l: any, i: number) => (
            <li key={i} className="border-b pb-2">
              <span className="font-medium">{l.action}</span> ({l.source}) by{' '}
              {l.byName || l.performedByName} ({l.role}) —{' '}
              {new Date(l.at).toLocaleString()}
              {l.comment && (
                <p className="text-xs text-slate-600">Comment: {l.comment}</p>
              )}
            </li>
          ))
        )}
      </ul>

      <a href="/audit" className="mt-3 inline-block text-blue-600">
        View Full Audit Log →
      </a>
    </div>
  );
}