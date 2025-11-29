import { useState } from 'react';
import { useAuth } from '../../app/auth';

export default function InvoiceApproval({invoiceId}:{invoiceId:string}){
  const { token } = useAuth();
  const [comment,setComment]=useState('');
  const [msg,setMsg]=useState('');

  const approve=async()=>{
    const res=await fetch(`/api/invoices/${invoiceId}/approve`,{
      method:'POST',
      headers:{'Content-Type':'application/json',Authorization:`Bearer ${token}`},
      body:JSON.stringify({comment})
    });
    const data=await res.json();
    setMsg(data.error||'Invoice approved');
  };

  const reject=async()=>{
    const res=await fetch(`/api/invoices/${invoiceId}/reject`,{
      method:'POST',
      headers:{'Content-Type':'application/json',Authorization:`Bearer ${token}`},
      body:JSON.stringify({comment})
    });
    const data=await res.json();
    setMsg(data.error||'Invoice rejected');
  };

  return(
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Approve/Reject Invoice</h1>
      <textarea className="mb-3 w-full border px-3 py-2" placeholder="Mandatory comment" value={comment} onChange={e=>setComment(e.target.value)} />
      <div className="flex gap-2">
        <button onClick={approve} className="bg-green-600 text-white px-3 py-2 rounded">Approve</button>
        <button onClick={reject} className="bg-red-600 text-white px-3 py-2 rounded">Reject</button>
      </div>
      {msg && <p className="mt-3">{msg}</p>}
    </div>
  );
}