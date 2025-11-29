import { useState } from 'react';

export default function ChangePassword(){
  const [currentPassword,setCurrent]=useState('');
  const [newPassword,setNew]=useState('');
  const [msg,setMsg]=useState('');

  const submit=async()=>{
    const res=await fetch('/api/auth/change-password',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({currentPassword,newPassword})});
    const data=await res.json();
    setMsg(data.message||data.error);
  };

  return(
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Change Password</h1>
      <input className="mb-3 w-full border px-3 py-2" type="password" placeholder="Current Password" value={currentPassword} onChange={e=>setCurrent(e.target.value)} />
      <input className="mb-3 w-full border px-3 py-2" type="password" placeholder="New Password" value={newPassword} onChange={e=>setNew(e.target.value)} />
      <button onClick={submit} className="bg-blue-600 text-white px-3 py-2 rounded">Change</button>
      {msg && <p className="mt-3">{msg}</p>}
    </div>
  );
}