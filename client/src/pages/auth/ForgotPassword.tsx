import { useState } from 'react';

export default function ForgotPassword(){
  const [email,setEmail]=useState('');
  const [msg,setMsg]=useState('');

  const submit=async()=>{
    const res=await fetch('/api/auth/forgot-password',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email})});
    const data=await res.json();
    setMsg(data.message);
  };

  return(
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <div className="w-full max-w-sm rounded border bg-white p-6 shadow">
        <h1 className="mb-4 text-xl font-semibold">Forgot Password</h1>
        <input className="mb-3 w-full border px-3 py-2" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <button onClick={submit} className="w-full bg-blue-600 text-white py-2 rounded">Send Reset Link</button>
        {msg && <p className="mt-3 text-green-600">{msg}</p>}
      </div>
    </div>
  );
}