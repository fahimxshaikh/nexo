import { createContext,useContext,useState,useEffect } from 'react';

const AuthCtx = createContext<any>(null);

export function AuthProvider({children}:any){
  const [token,setToken] = useState(localStorage.getItem('token'));
  const [user,setUser] = useState<any>(null);

  useEffect(()=>{
    if(!token) return setUser(null);
    fetch('/api/auth/me',{headers:{Authorization:`Bearer ${token}`}})
      .then(r=>r.json()).then(d=>setUser(d.user)).catch(()=>setUser(null));
  },[token]);

  const login=(t:string,u:any)=>{ localStorage.setItem('token',t); setToken(t); setUser(u); };
  const logout=()=>{ localStorage.removeItem('token'); setToken(null); setUser(null); };

  return <AuthCtx.Provider value={{token,user,login,logout}}>{children}</AuthCtx.Provider>;
}
export const useAuth=()=>useContext(AuthCtx);