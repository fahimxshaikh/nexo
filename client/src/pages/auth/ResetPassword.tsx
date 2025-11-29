import { useState } from 'react';
import { useParams } from 'react-router-dom';

export default function ResetPassword(){
  const { token } = useParams();
  const [password,setPassword]=useState('');
  const [msg,setMsg]=useState('');

  const submit=async()=>{
    const res=await fetch(`/api/auth/reset-password/${token}`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({password})});
    const data=await res.json();
    setMsg(data.message||data.error);
  };

  return(
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <div className="w-full max-w-sm rounded border bg-white p-6 shadow">
        <h1 className="mb-4 text-xl font-semibold">Reset Password</h1>
        <input className="mb-3 w-full border px-3 py-2" type="password" placeholder="New Password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button onClick={submit} className="w-full bg-blue-600 text-white py-2 rounded">Reset</button>
        {msg && <p className="mt-3">{msg}</p>}
      </div>
    </div>
  );
}