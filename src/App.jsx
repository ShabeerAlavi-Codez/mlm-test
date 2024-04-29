
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Use BrowserRouter for client-side routing
import Adashbord from './components/admin/auth/Dashboard';
import ALogin from './components/admin/auth/Login';
import TreeView from './components/admin/auth/TreeView';
import Settings from './components/admin/auth/Settings';
import Approval from './components/admin/auth/Approval';
import AdminRoute from './components/admin/auth/AdminRoute';
import Users from './components/admin/auth/Users';
import Areport from './components/admin/report/Areport';
import Allusrep from './components/admin/report/Allusrep';
import Njusrep from './components/admin/report/Njusrep';
import Datenjrep from './components/admin/report/Datenjrep';
import AllInUsRep from './components/admin/report/AllInUsRep';
import AllActUsRep from './components/admin/report/AllActUsRep';
import Pend2Rep from './components/admin/report/Pend2Rep';
import Apv1Rep from './components/admin/report/Apv1Rep';
import Apv2Rep from './components/admin/report/Apv2Rep';
import Sotp from './components/common/Sotp';

const App = () => {
  return (
    <Router> {/* Wrap app in BrowserRouter */}
      <div className="min-h-full h-screen flex items-center justify-center">
        <div className="w-full space-y-8 ">
          <Routes>
            <Route path="/" element={<ALogin />} /> {/* Exact path not needed for root path */}
            <Route path="/alogin" element={<ALogin/>} />
            <Route path="/s/otpplus" element={<Sotp/>} />
            <Route path="/adashboard" element={<AdminRoute><Adashbord /></AdminRoute>} /> 
            <Route path="/areport" element={<AdminRoute><Areport/></AdminRoute>} />
            <Route path="/allusrep" element={<AdminRoute><Allusrep/></AdminRoute>} />
            <Route path="/njusrep" element={<AdminRoute><Njusrep/></AdminRoute>} />
            <Route path="/datenjrep" element={<AdminRoute><Datenjrep/></AdminRoute>} />
            <Route path="/allinusrep" element={<AdminRoute><AllInUsRep/></AdminRoute>} />
            <Route path="/allactusRep" element={<AdminRoute><AllActUsRep/></AdminRoute>} />
            <Route path="/pen2rep" element={<AdminRoute><Pend2Rep/></AdminRoute>} />
            <Route path="/apv1rep" element={<AdminRoute><Apv1Rep/></AdminRoute>} />
            <Route path="/apv2rep" element={<AdminRoute><Apv2Rep/></AdminRoute>} />
            <Route path="/umgt" element={<AdminRoute><Users /></AdminRoute>} />
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
