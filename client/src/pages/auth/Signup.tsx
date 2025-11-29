import { useState } from 'react';
import { useAuth } from '../../app/auth';
import { useNavigate, Link } from 'react-router-dom';

export default function Signup() {
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [role,setRole]=useState('Employee');
  const [employeeRole,setEmployeeRole]=useState('Maker');
  const [error,setError]=useState('');
  const nav=useNavigate();
  const { login } = useAuth();

  const submit=async()=>{
    const res=await fetch('/api/auth/signup',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({name,email,password,role,employeeRole})
    });
    const data=await res.json();
    if(data.token){ login(data.token,data.user); nav('/'); } else setError(data.error||'Signup failed');
  };

  return(
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <div className="w-full max-w-sm rounded border bg-white p-6 shadow">
        <h1 className="mb-4 text-xl font-semibold">Sign up</h1>
        {error && <p className="text-red-600">{error}</p>}
        <input className="mb-3 w-full border px-3 py-2" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
        <input className="mb-3 w-full border px-3 py-2" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="mb-3 w-full border px-3 py-2" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
        <select className="mb-3 w-full border px-3 py-2" value={role} onChange={e=>setRole(e.target.value)}>
          <option>Admin</option>
          <option>Employee</option>
        </select>
        {role==='Employee' && (
          <select className="mb-3 w-full border px-3 py-2" value={employeeRole} onChange={e=>setEmployeeRole(e.target.value)}>
            <option>Maker</option>
            <option>Checker</option>
          </select>
        )}
        <button onClick={submit} className="w-full bg-blue-600 text-white py-2 rounded">Sign up</button>
        <p className="mt-3 text-sm">Already have an account? <Link to="/login" className="text-blue-600">Login</Link></p>
      </div>
    </div>
  );
}