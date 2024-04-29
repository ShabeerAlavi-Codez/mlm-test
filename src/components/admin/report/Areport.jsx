import { useState,useEffect } from "react"
import { BASE_URI} from '../../../../config/keys-dev';
import SideBar from "../auth/SideBar";

export default function Areport() {
    const [apidata, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const [cmpUpiId,setCmpUpiId]=useState('');
    const storedValue = localStorage.getItem("asup"); 
    const tile=localStorage.getItem("_r");

    // useEffect(() => {
    //     const fetchData = async () => {
    //       setIsLoading(true); // Set loading state to true
    //       try {
    //         const response = await fetch(`${BASE_URI}api/admin/cmp`);
    //         const fetchedData = await response.json();
    //        // console.log("333fetchedData3333##",fetchedData.data);
    //         setData(fetchedData.data);
    //         setCmpUpiId(fetchedData.data[0].UpiId)
    //       } catch (error) {
    //         console.error('Error fetching data:', error); // Handle errors gracefully
    //       } finally {
    //         setIsLoading(false); // Set loading state to false after fetch (optional)
    //       }
    //     };
    
    //     fetchData(); // Call the fetch function on component mount
    //   }, []); 

    //   const onchangeUpi=(e)=>{
    //     setCmpUpiId(e.target.value)
    //   }

    return (

<div className="flex">
<div className="flex flex-col h-screen sticky top-0 p-3 bg-gray-800 shadow w-60">
<div className="space-y-3">
 <SideBar></SideBar>
  </div>
</div>
<div className="container mx-auto mt-12">
  <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-3">
  {storedValue !== null && (
                <>
                <div className="w-full px-4 py-5 bg-white rounded-lg shadow-2xl">
          <div className="text-sm font-medium text-gray-500 truncate">
         <a href="/datenjrep">Datewise node join Report</a> 
          </div>
      </div>
      <div className="w-full px-4 py-5 bg-white rounded-lg shadow-2xl">
          <div className="text-sm font-medium text-gray-500 truncate">
         <a href="/allusrep">Complete User Report</a> 
          </div>
      </div>
      <div className="w-full px-4 py-5 bg-white rounded-lg shadow-2xl">
          <div className="text-sm font-medium text-gray-500 truncate">
          <a href="/njusrep"> Ist Payment Pending Users</a>
          </div>
         
      </div>
      <div className="w-full px-4 py-5 bg-white rounded-lg shadow-2xl">
          <div className="text-sm font-medium text-gray-500 truncate">
         <a href="apv1rep">Ist Payment for approval</a> 
         </div>
      </div>
      <div className="w-full px-4 py-5 bg-white rounded-lg shadow-2xl">
          <div className="text-sm font-medium text-gray-500 truncate">
          <a href="apv2rep"> IIst Payment for approval </a>
          </div>
         
      </div>
      <div className="w-full px-4 py-5 bg-white rounded-lg shadow-2xl">
          <div className="text-sm font-medium text-gray-500 truncate">
          
          <a href="/pen2rep">IIst Payment Pending</a> 
          </div>
         
      </div>
      
    
      <div className="w-full px-4 py-5 bg-white rounded-lg shadow-2xl">
          <div className="text-sm font-medium text-gray-500 truncate">
           <a href="/allactusRep">Tasks Progressing /Active Users</a> 
          </div>
      </div>
      <div className="w-full px-4 py-5 bg-white rounded-lg shadow-2xl">
          <div className="text-sm font-medium text-gray-500 truncate"> 
          <a href="/allinusrep">Tasks Completed Users </a>
             
          </div>
      </div>
                </>
  )}
   {storedValue == null && (
                <>
                  {tile&&tile.includes("r1")&&(
                    <div className="w-full px-4 py-5 bg-white rounded-lg shadow-2xl">
                    <div className="text-sm font-medium text-gray-500 truncate">
                   <a href="/datenjrep">Datewise node join Report</a> 
                    </div>
                </div>
                  )}
                  {tile&&tile.includes("r2")&&(
                      <div className="w-full px-4 py-5 bg-white rounded-lg shadow-2xl">
                      <div className="text-sm font-medium text-gray-500 truncate">
                      <a href="/njusrep"> Ist Payment Pending Users</a>
                      </div>
                     
                  </div>
                  )}
                  {tile&&tile.includes("r3")&&(
                         <div className="w-full px-4 py-5 bg-white rounded-lg shadow-2xl">
                         <div className="text-sm font-medium text-gray-500 truncate">
                        <a href="apv1rep">Ist Payment for approval</a> 
                        </div>
                     </div>
                  )}
                  {tile&&tile.includes("r4")&&(
                     <div className="w-full px-4 py-5 bg-white rounded-lg shadow-2xl">
                     <div className="text-sm font-medium text-gray-500 truncate">
                     <a href="apv2rep"> IIst Payment for approval </a>
                     </div>
                    
                 </div>
                  )}
                  {tile&&tile.includes("r5")&&(
                     <div className="w-full px-4 py-5 bg-white rounded-lg shadow-2xl">
                     <div className="text-sm font-medium text-gray-500 truncate">
                     
                     <a href="/pen2rep">IIst Payment Pending</a> 
                     </div>
                    
                 </div>
                  )}
                  {tile&&tile.includes("r6")&&(
                     <div className="w-full px-4 py-5 bg-white rounded-lg shadow-2xl">
                     <div className="text-sm font-medium text-gray-500 truncate">
                      <a href="/allactusRep">Tasks Progressing /Active Users</a> 
                     </div>
                 </div>
                  )}
                  {tile&&tile.includes("r7")&&(
                    <div className="w-full px-4 py-5 bg-white rounded-lg shadow-2xl">
                    <div className="text-sm font-medium text-gray-500 truncate"> 
                    <a href="/allinusrep">Tasks Completed Users </a>
                       
                    </div>
                </div>
                  )}

                </>
  )}
  
  </div>
</div>
</div>
    )
}