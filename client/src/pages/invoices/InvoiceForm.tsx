import { useState } from 'react';
import { useAuth } from '../../app/auth';

export default function InvoiceForm(){
  const { token } = useAuth();
  const [vendorName,setVendor]=useState('');
  const [invoiceNo,setInvoiceNo]=useState('');
  const [claimAmount,setAmount]=useState('');
  const [msg,setMsg]=useState('');

  const submit=async()=>{
    const res=await fetch('/api/invoices',{
      method:'POST',
      headers:{'Content-Type':'application/json',Authorization:`Bearer ${token}`},
      body:JSON.stringify({vendorName,invoiceNo,claimAmount})
    });
    const data=await res.json();
    setMsg(data.error||'Invoice created');
  };

  return(
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">New Invoice</h1>
      <input className="mb-3 w-full border px-3 py-2" placeholder="Vendor Name" value={vendorName} onChange={e=>setVendor(e.target.value)} />
      <input className="mb-3 w-full border px-3 py-2" placeholder="Invoice No" value={invoiceNo} onChange={e=>setInvoiceNo(e.target.value)} />
      <input className="mb-3 w-full border px-3 py-2" placeholder="Claim Amount" value={claimAmount} onChange={e=>setAmount(e.target.value)} />
      <button onClick={submit} className="bg-blue-600 text-white px-3 py-2 rounded">Submit</button>
      {msg && <p className="mt-3">{msg}</p>}
    </div>
  );
}