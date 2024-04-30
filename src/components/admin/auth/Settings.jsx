import { useState,useEffect } from "react"
import { BASE_URI} from '../../../../config/keys-dev';
import SideBar from "./SideBar";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom'
export default function Settings() {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const [apidata, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const [cmpUpiId,setCmpUpiId]=useState('');
    const [cmpAmt,setCmpAmt]=useState('');
    const [isToggled, setIsToggled] = useState(false);

    const handleToggle = async(event) => {
      setIsToggled(!isToggled);
      if( event.target.checked==true){
        setIsLoading(true)
           const formData = new FormData();
            formData.append('zone', false);
           const response = await fetch(`${BASE_URI}api/admin/cmpzone`, {
            method: 'POST',
            body: formData
          });
           const fetchedData = await response.json();
           setIsLoading(false)
           window.location.reload()

      }else{
        setIsLoading(true)
        const formData = new FormData();
         formData.append('zone', true);
        const response = await fetch(`${BASE_URI}api/admin/cmpzone`, {
         method: 'POST',
         body: formData
       });
        const fetchedData = await response.json();
        setIsLoading(false)
        window.location.reload()
      }
    };
    const handeleUpiUpdate= async(e)=>{
     
      e.preventDefault();
        try {
           setIsLoading(true)
           const formData = new FormData();
            formData.append('cmpUpiId', cmpUpiId);
           const response = await fetch(`${BASE_URI}api/admin/cmpupdate`, {
            method: 'POST',
            body: formData
          });
           const fetchedData = await response.json();
          window.location.reload()
        } catch (err) {
          console.log(err,"errrrr")
          //setSigninRequestStatus('idle')
          console.error(err.response.data.errors)
         // setErrormsg(err.response.data.errors)
        } finally {
          setIsLoading(false)
        }

    }
    const handeleAmtUpdate= async(e)=>{
     
      e.preventDefault();
        try {
           setIsLoading(true)
           const formData = new FormData();
            formData.append('cmpAmt', cmpAmt);
           const response = await fetch(`${BASE_URI}api/admin/cmpamtupdate`, {
            method: 'POST',
            body: formData
          });
           const fetchedData = await response.json();
           window.location.reload()
        } catch (err) {
          console.log(err,"errrrr")
          //setSigninRequestStatus('idle')
          console.error(err.response.data.errors)
         // setErrormsg(err.response.data.errors)
        } finally {
          setIsLoading(false)
        }

    }
    useEffect(() => {
        const fetchData = async () => {
          setIsLoading(true); // Set loading state to true
          try {
            const response = await fetch(`${BASE_URI}api/admin/cmp`);
            const fetchedData = await response.json();
           // console.log("333fetchedData3333##",fetchedData.data);
            setData(fetchedData.data);
            setCmpUpiId(fetchedData.data[0].UpiId)
            setCmpAmt(fetchedData.data[0].Amt)
            setIsToggled(fetchedData.data[0].zone)
          } catch (error) {
            console.error('Error fetching data:', error); // Handle errors gracefully
          } finally {
            setIsLoading(false); // Set loading state to false after fetch (optional)
          }
        };
    
        fetchData(); // Call the fetch function on component mount
      }, []); 

      const onchangeUpi=(e)=>{
        setCmpUpiId(e.target.value)
      }
      const onchangeAmt=(e)=>{
        setCmpAmt(e.target.value)
      }
    return (
        <div className="flex">
        <div className="flex flex-col h-screen sticky top-0 p-3 bg-gray-800 shadow w-60">
            <div className="space-y-3">
               <SideBar></SideBar>
            </div>
        </div>
        <div className="container mx-auto mt-12">
            <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-1">
            <div className="relative p-4">
            {isLoading && <p>Loading data...</p>}
                {apidata && (
                    <div>
            <form onSubmit={handeleUpiUpdate}>
                <input autoComplete="off"  value={cmpUpiId} onChange={onchangeUpi}  name="UpiId" type="text" className="peer placeholder-transparent h-10 w-65 border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="" /> 
                
                <label htmlFor="email" className="p-4 absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Company UpiId</label>

                <button type="submit" className='text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ml-2"'> update UpiId</button>
                </form>
               
                <form onSubmit={ handeleAmtUpdate}>
                <label for="name" className="block mb-2 font-bold text-gray-600">Ist Payment Amount</label>
                 <input type="text" id="name" value={cmpAmt} onChange={onchangeAmt} name="username" placeholder="Amount" className="border border-gray-300 shadow p-3 w-600 rounded mb-"/>
                 <button type="submit" className='text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ml-2"'> update Amount</button>
                </form>
                <label className="relative flex justify-between items-center p-2 text-xl">
        Stop website
        <input
          type="checkbox"
          className="absolute left-1/2 -translate-x-1/2 w-full h-full peer appearance-none rounded-md"
          checked={!isToggled}
          onChange={handleToggle}
        />
        <span
          className={`w-16 h-10 flex items-center flex-shrink-0 ml-4 p-1 bg-gray-300 rounded-full duration-300 ease-in-out peer-checked:bg-green-400 ${
            isToggled ? 'after:w-8 after:h-8 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-6' : ''
          }`}
        ></span>
      </label>
                </div>
                )}
                {!isLoading && !apidata && <p>No data available yet.</p>}
              
              
            </div>
            </div>
        </div>
    </div>
    
    )
    }