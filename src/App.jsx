
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Use BrowserRouter for client-side routing
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/user/Dashboard';
import Notification from './components/user/Notification';
import Adashbord from './components/admin/auth/Dashboard';
import ALogin from './components/admin/auth/Login';
import Otp from './components/auth/Otp';
import TreeView from './components/admin/auth/TreeView';
import Settings from './components/admin/auth/Settings';
import Approval from './components/admin/auth/Approval';
import PrivateRoute from './components/auth/PrivateRoute';
import AdminRoute from './components/admin/auth/AdminRoute';

const App = () => {
  return (
    <Router> {/* Wrap app in BrowserRouter */}
      <div className="min-h-full h-screen flex items-center justify-center">
        <div className="w-full space-y-8 ">
          <Routes>
            <Route path="/" element={<Login />} /> {/* Exact path not needed for root path */}
            <Route path="/otp" element={<Otp />} />
            <Route path="/register" element={<Register />} />
            <Route path="/udashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/notification" element={<PrivateRoute><Notification/></PrivateRoute>} />
            <Route path="/alogin" element={<ALogin/>} />
            <Route path="/adashboard" element={<AdminRoute><Adashbord /></AdminRoute>} />
            <Route path="/nodeview" element={<AdminRoute><TreeView /></AdminRoute>} />
            <Route path="/approval" element={<AdminRoute><Approval /></AdminRoute>} />
            <Route path="/settings" element={<AdminRoute><Settings /></AdminRoute>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
