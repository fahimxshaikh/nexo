import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../../app/auth';

export default function UserManagement(){
  const { token } = useAuth();
  const { data } = useQuery({
    queryKey:['users'],
    queryFn:async()=>{
      const res=await fetch('/api/users',{headers:{Authorization:`Bearer ${token}`}});
      return res.json();
    }
  });

  const users=data?.data||[];

  return(
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Manage Users</h1>
      <table className="w-full border bg-white rounded">
        <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Employee Role</th><th>Status</th></tr></thead>
        <tbody>
          {users.map((u:any)=>(
            <tr key={u._id} className="border-b">
              <td>{u.name}</td><td>{u.email}</td><td>{u.role}</td><td>{u.employeeRole||'-'}</td><td>{u.active?'Active':'Inactive'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}