import { useState,useEffect } from 'react'; 
import Navbar from './Navbar'; 
import DataTable from 'react-data-table-component'; 
import { useDispatch,useSelector } from 'react-redux';
import { BASE_URI} from '../../../config/keys-dev';

export default function Notification() {
    const [apidata, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [refresh,setRefresh]=useState(false);

useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // Set loading state to true
      try {
        const uId=localStorage.getItem("_i");
        const url=`${BASE_URI}api/users/ctpay/${uId}`;
        const response = await fetch(url);
        const fetchedData = await response.json();
       console.log("nnnnnnnnnnnnnnnnnnnnnfetchedData3333##",url,fetchedData.data);
        setData(fetchedData.data);
      } catch (error) {
        console.error('Error fetching data:', error); // Handle errors gracefully
      } finally {
        setIsLoading(false); // Set loading state to false after fetch (optional)
      }
    };

    fetchData(); // Call the fetch function on component mount
  }, [refresh]); 
    
    // const {name,email,mobile,firstPaymentStatus,secondPaymentStatus,bankDetailsStatus} = useSelector(state => state.register)
    // const dispatch= useDispatch();
    // useEffect(() => {
    //    setName( localStorage.getItem("_n"))
    //    setUserId(localStorage.getItem("_i"))
    //    setMobile(localStorage.getItem("_m"))
    //   }, [])

        

            
        
    return (

    <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
            </h2>
        </div>
        <Navbar from={"noti"}/> 
            <div className="p-2 m-8"> 
            <div class="shadow-lg rounded-lg bg-white mx-auto m-8 p-4 notification-box flex">
            <div class="pr-2">
              <svg
                class="fill-current text-green-600"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="22"
                height="22"
              >
                <path
                  class="heroicon-ui"
                  d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-3.54-4.46a1 1 0 0 1 1.42-1.42 3 3 0 0 0 4.24 0 1 1 0 0 1 1.42 1.42 5 5 0 0 1-7.08 0zM9 11a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm6 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"
                />
              </svg>
            </div>
            <div>
              <div class="text-sm pb-2">
                Notification
              </div>
              <div className="text-sm text-gray-600 tracking-tight">
  {apidata && apidata.length > 0 ? (
    apidata.map((data, index) => (
      <div key={index}>
        <p>Payment from :{data.name}</p>
        <p>Payee Details: {data.mobile}</p>
        <img src={`${BASE_URI}uploads/spay/${data.userId}.png`} style={{height:400}}  width={200} />
        <div>
          <button className='text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'>Approved</button>
        </div>
      </div>
    ))
  ) : (
    <p>No notifications available</p>
  )}
</div>
            </div>
          </div>
            </div> 
        
        <p className="text-center text-gray-600 textbase mt-9">
            Still have questions? 
           <a href='#' ><span className="cursor-pointer font-medium text-tertiary transition-all duration-200 hover:text-tertiary focus:text-tertiary hover-underline">Contact
                our support
            </span> </a>
        </p>
        <a href="https://api.whatsapp.com/send?phone=51955081075&text=Hola%21%20Quisiera%20m%C3%A1s%20informaci%C3%B3n%20sobre%20Varela%202." class="float" target="_blank">
            <i class="fa fa-whatsapp my-float"></i>
        </a>
    </div>

    );
  }
  