import { useState,useEffect } from "react"
import { BASE_URI} from '../../../../config/keys-dev';
import SideBar from "./SideBar";

export default function Areport() {
    const [apidata, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const [cmpUpiId,setCmpUpiId]=useState('');

    useEffect(() => {
        const fetchData = async () => {
          setIsLoading(true); // Set loading state to true
          try {
            const response = await fetch(`${BASE_URI}api/admin/cmp`);
            const fetchedData = await response.json();
           // console.log("333fetchedData3333##",fetchedData.data);
            setData(fetchedData.data);
            setCmpUpiId(fetchedData.data[0].UpiId)
          } catch (error) {
            console.error('Error fetching data:', error); // Handle errors gracefully
          } finally {
            setIsLoading(false); // Set loading state to false after fetch (optional)
          }
        };
    
        fetchData(); // Call the fetch function on component mount
      }, []); 

    //   const onchangeUpi=(e)=>{
    //     setCmpUpiId(e.target.value)
    //   }

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
          Complete User Report
          </div>
      </div>
      <div className="w-full px-4 py-5 bg-white rounded-lg shadow-2xl">
          <div className="text-sm font-medium text-gray-500 truncate">
              New joining
          </div>
         
      </div>
      <div className="w-full px-4 py-5 bg-white rounded-lg shadow-2xl">
          <div className="text-sm font-medium text-gray-500 truncate">
              Pending approval
          </div>
         
      </div>
      <div className="w-full px-4 py-5 bg-white rounded-lg shadow-2xl">
          <div className="text-sm font-medium text-gray-500 truncate">
              Active Users
          </div>
      </div>
      <div className="w-full px-4 py-5 bg-white rounded-lg shadow-2xl">
          <div className="text-sm font-medium text-gray-500 truncate">
              Inactive Users
          </div>
      </div>
  </div>
</div>
</div>
    )
}