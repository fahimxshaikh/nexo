export default function Reports(){
  return(
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Audit Reports</h1>
      <div className="flex gap-2">
        <a href="/api/audit/admin/export/csv" className="bg-slate-700 text-white px-3 py-2 rounded">Export Admin CSV</a>
        <a href="/api/audit/admin/export/xlsx" className="bg-blue-600 text-white px-3 py-2 rounded">Export Admin Excel</a>
      </div>
    </div>
  );
}