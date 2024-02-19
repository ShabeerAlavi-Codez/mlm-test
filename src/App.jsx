import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/user/Dashboard';
import Adashbord from './components/admin/auth/Dashboard'
import Otp from "./components/auth/Otp";
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
              <Route path="/udashboard" exact  element={<Dashboard/>} /> 
              <Route path="/adashboard" exact  element={<Adashbord/>} /> 
              </Routes>
            </>
        </Router>
      </div>
    </div>

  );
};

export default App;