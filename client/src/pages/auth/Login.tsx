import { useState } from 'react';
import { useAuth } from '../../app/auth';
import { useNavigate,Link } from 'react-router-dom';

export default function Login(){
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [error,setError]=useState('');
  const nav=useNavigate();
  const { login } = useAuth();

  const submit=async()=>{
    const res=await fetch('/api/auth/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email,password})});
    const data=await res.json();
    if(data.token){ login(data.token,data.user); nav('/'); } else setError(data.error||'Login failed');
  };

  return(
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <div className="w-full max-w-sm rounded border bg-white p-6 shadow">
        <h1 className="mb-4 text-xl font-semibold">Login to Nexo</h1>
        {error && <p className="text-red-600">{error}</p>}
        <input className="mb-3 w-full border px-3 py-2" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="mb-3 w-full border px-3 py-2" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button onClick={submit} className="w-full bg-blue-600 text-white py-2 rounded">Login</button>
        <p className="mt-3 text-sm">No account? <Link to="/signup" className="text-blue-600">Sign up</Link></p>
      </div>
    </div>
  );
}