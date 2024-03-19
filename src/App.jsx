import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/user/Dashboard';
import Adashbord from './components/admin/auth/Dashboard'
import Otp from "./components/auth/Otp";
import TreeView from "./components/admin/auth/TreeView";
import Settings from "./components/admin/auth/Settings";
import Approval from "./components/admin/auth/Approval";
// import PrivateRoute from "./components/auth/PrivateRoute";
const App = () => {
  return (
    <div className="min-h-full h-screen flex items-center justify-center">
      {/* py-12 px-4 sm:px-6 lg:px-8 */}
      <div className=" w-full space-y-8">
        <Router >
            <>
              <Routes>             
                <Route path="/" exact  element={<Login/>} />
                  <Route path="/otp" exact  element={<Otp/>} />
                  <Route path="/register" exact  element={<Register/>} />
                  <Route path="/udashboard" exact   element={<Dashboard />} /> 
                  <Route path="/adashboard" exact  element={<Adashbord/>} /> 
                  <Route path="/nodeview" exact  element={<TreeView/>} /> 
                  <Route path="/approval" exact   element={<Approval />} />
                  <Route path="/settings" exact  element={<Settings/>} /> 
              </Routes>
            </>
        </Router>
      </div>
    </div>

  );
};

export default App;