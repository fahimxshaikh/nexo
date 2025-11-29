import { Navigate } from 'react-router-dom';
import { useAuth } from '../app/auth';

export default function RequireAuth({children,roles}:{children:any;roles?:string[]}){
  const { user } = useAuth();
  if(!user) return <Navigate to="/login" replace />;
  if(roles){
    const allowed = user.role==='Admin' || (user.role==='Employee' && roles.includes(user.employeeRole));
    if(!allowed) return <div className="p-6">Access denied</div>;
  }
  return children;
}