import { BrowserRouter,Routes,Route } from 'react-router-dom';
import { AuthProvider } from './app/auth';
import RequireAuth from './components/RequireAuth';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import ChangePassword from './pages/auth/ChangePassword';
import Dashboard from './pages/Dashboard';
import InvoiceForm from './pages/invoices/InvoiceForm';
import UserManagement from './pages/users/UserManagement';
import Reports from './pages/reports/Reports';

export default function App(){
  return(
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/forgot-password" element={<ForgotPassword/>}/>
          <Route path="/reset-password/:token" element={<ResetPassword/>}/>
          <Route path="/change-password" element={<RequireAuth><ChangePassword/></RequireAuth>}/>
          <Route path="/" element={<RequireAuth><Dashboard/></RequireAuth>}/>
          <Route path="/invoices/new" element={<RequireAuth roles={['Maker','Admin']}><InvoiceForm/></RequireAuth>}/>
          <Route path="/users" element={<RequireAuth roles={['Admin']}><UserManagement/></RequireAuth>}/>
          <Route path="/reports" element={<RequireAuth roles={['Admin']}><Reports/></RequireAuth>}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}