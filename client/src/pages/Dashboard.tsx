import RecentAuditWidget from '../components/RecentAuditWidget';

export default function Dashboard(){
  return(
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Admin Dashboard</h1>
      <RecentAuditWidget />
    </div>
  );
}