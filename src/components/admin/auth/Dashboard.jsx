
import { useState ,useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { BASE_URI} from '../../../../config/keys-dev';
// import { increment } from "../../features/counterSlice";
 import SideBar from './SideBar';
import { useNavigate } from 'react-router-dom'
import { signout } from '../../../features/registerSlice'; 



export default function Dashboard() {
    const [apidata, setData] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const navigate=useNavigate();
    const dispatch=useDispatch();
    const handleLogout = async () => {
        try {
          await dispatch(signout()); // Dispatch the signout action
          navigate('/'); // Navigate to the login route after successful logout
        } catch (error) {
          console.error('Error during logout:', error);
          // Handle errors here (optional: display error message to user)
        }
      };

      useEffect(() => {
        const fetchData = async () => {
          setIsLoading(true); // Set loading state to true
          try {
            const response = await fetch(`${BASE_URI}api/admin/dl`);
            const fetchedData = await response.json();
            console.log("333fetche 4444444444444444##",fetchedData.data);
            setData(fetchedData.data);
          } catch (error) {
            console.error('Error fetching data:', error); // Handle errors gracefully
          } finally {
            setIsLoading(false); // Set loading state to false after fetch (optional)
          }
        };
    
        fetchData(); // Call the fetch function on component mount
      }, []); 

     
    return (

        <div className="flex">
          <div className="flex flex-col h-screen p-3 bg-gray-800 shadow w-60">
          <div className="space-y-3">
           <SideBar></SideBar>
            </div>
        </div>
        <div className="container mx-auto mt-12">
            <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-3">
                <div className="w-full px-4 py-5 bg-white rounded-lg shadow-2xl">
                    <div className="text-sm font-medium text-gray-500 truncate">
                        Total users
                    </div>
                    <div className="mt-1 text-3xl font-semibold text-gray-900">
                        
                       <p> {apidata.nodeUser}</p>
                    </div>
                </div>
                <div className="w-full px-4 py-5 bg-white rounded-lg shadow-2xl">
                    <div className="text-sm font-medium text-gray-500 truncate">
                        New joining
                    </div>
                    <div className="mt-1 text-3xl font-semibold text-blue-900">
                      {apidata.newJoin}
                    </div>
                </div>
                <div className="w-full px-4 py-5 bg-white rounded-lg shadow-2xl">
                    <div className="text-sm font-medium text-gray-500 truncate">
                       Ist Payment for approval
                    </div>
                    <div className="mt-1 text-3xl font-semibold text-green-900">
                    {apidata.fapproval}
                    </div>
                </div>
                <div className="w-full px-4 py-5 bg-white rounded-lg shadow-2xl">
                    <div className="text-sm font-medium text-gray-500 truncate">
                       IIst Payment for approval
                    </div>
                    <div className="mt-1 text-3xl font-semibold text-green-900">
                    {apidata.sapproval}
                    </div>
                </div>
                <div className="w-full px-4 py-5 bg-white rounded-lg shadow-2xl">
                    <div className="text-sm font-medium text-gray-500 truncate">
                       IIst Payment Pending
                    </div>
                    <div className="mt-1 text-3xl font-semibold text-green-900">
                    {apidata.spending}
                    </div>
                </div>
                <div className="w-full px-4 py-5 bg-white rounded-lg shadow-2xl">
                    <div className="text-sm font-medium text-gray-500 truncate">
                        Active Users
                    </div>
                    <div className="mt-1 text-3xl font-semibold text-gray-900">
                    {apidata.Inactive}
                    </div>
                </div>
                <div className="w-full px-4 py-5 bg-white rounded-lg shadow-2xl">
                    <div className="text-sm font-medium text-gray-500 truncate">
                        Inactive Users
                    </div>
                    <div className="mt-1 text-3xl font-semibold text-red-900">
                    {apidata.active}
                    </div>
                </div>
            </div>
        </div>
    </div>

         

    );
  }
  