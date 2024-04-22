import { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component'; 
import { addNode,rejCmp } from "../../../features/nodelistSlice";
import { BASE_URI} from '../../../../config/keys-dev';
import { useDispatch,useSelector } from 'react-redux';
import FsLightbox from "fslightbox-react";
import { signout } from '../../../features/registerSlice'; 
import SideBar from './SideBar';
import { useNavigate } from 'react-router-dom';



export default function Approval() {
    const dispatch=useDispatch()
    const navigate =useNavigate()
    const [apidata, setData] = useState(null);
    const [toggler, setToggler] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [refresh,setRefresh]=useState(false);
    const toggleItem = (itemId,st) => {
        console.log(toggler,"kkkk")
        setToggler(prevState => ({
          ...prevState,
          [itemId]: st // Toggle the state of the item
        }));
      };
    
// const expandableRows= true;
// const	expandOnRowClicked=false;
// const	expandOnRowDoubleClicked=false;
// const	expandableRowsHideExpander= false;

useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // Set loading state to true
      try {
        const response = await fetch(`${BASE_URI}api/admin/approve`);
        const fetchedData = await response.json();
       // console.log("333fetchedData3333##",fetchedData.data);
        setData(fetchedData.data);
      } catch (error) {
        console.error('Error fetching data:', error); // Handle errors gracefully
      } finally {
        setIsLoading(false); // Set loading state to false after fetch (optional)
      }
    };

    fetchData(); // Call the fetch function on component mount
  }, [refresh]); 
  const handleLogout = async () => {
    try {
      await dispatch(signout()); // Dispatch the signout action
      navigate('/'); // Navigate to the login route after successful logout
    } catch (error) {
      console.error('Error during logout:', error);
      // Handle errors here (optional: display error message to user)
    }
  };

  const handleApprove =async (row)=>{
       
    try {
        setIsLoading(true);
        let formData={
            userId: row.userId,
            name: row.name,
            mobile:row.mobile,
            upiId: row.upiId,
            payment_status:row.payment_status,
            accNo:row.accNo,
            ifsc:row.ifsc,
            uMobile:row.uMobile,


        }
        await dispatch(addNode(formData)).unwrap();
        setRefresh(!refresh)
       // navigate("/approval")
    //     const response = await fetch(`${BASE_URI}api/admin/approve`);
    //     const fetchedData = await response.json();
    //    // console.log("333fetchedData3333##",fetchedData.data);
    //     setData(fetchedData.data);
      } catch (err) {
        console.error('Unable to create post:', err);
      } finally {
        setIsLoading(false); // Reset loading state
      }

  }
  const handleReject =async (row)=>{
    try {
        setIsLoading(true);
        let formData={
            userId: row.userId,
            name: row.name,
            mobile:row.mobile,
            upiId: row.upiId,
            payment_status:row.payment_status 


        }
        await dispatch(rejCmp(formData)).unwrap();
        setRefresh(!refresh)
      } catch (err) {
        console.error('Unable to create post:', err);
      } finally {
        setIsLoading(false); // Reset loading state
      }
  }
    
    const columns = [
        {
            name: 'slNo',
            selector: (row, index) => index + 1,
            sortable: true,
        },
        {
            name: 'name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'mobile',
            selector: row => row.mobile,
            sortable: true,
        },
        {
            name: 'company upi',
            selector: row => row.upiId,
            sortable: true,
        },
        {
            name: 'user upi',
            selector: row => row.paymentDetails[0].cmp_upi,
            sortable: true,
        },
        {
            name: 'image',
            cell: (row,index) => (
                <>
                <button onClick={() => toggleItem(index,true)}>
                <img
                    src={`${BASE_URI}uploads/${row.userId}.png`}
                    alt="User Image"
                    style={{ width: '50px', height: '50px', cursor: 'pointer' }}
                   // onClick={() => handleImageClick(row.userId)}
                />
                </button>
                <FsLightbox
				toggler={toggler}
				sources={[
					`${BASE_URI}uploads/${row.userId}.png`,
				]}
			/>
                </>
               
            ),
        },
        {
            name: 'approvel',
            cell: (row) => (
                <div>
                <button onClick={() => handleApprove(row)} className='text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"' >Approved</button>
                </div>
            ),
        },
        {
            name: 'reject',
            cell: (row) => (
                <div>
                <button onClick={() => handleReject(row)} className='text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900 mt-2'>Rejected</button>
            </div>
            ),
        }
    ];
    
    //const ExpandedComponent = ( apidata ) => <pre>{JSON.stringify(apidata.data, null, 2)}</pre>;
 


    return (
        <div className="flex">
        <div className="flex flex-col h-screen p-3 bg-gray-800 shadow w-60">
            <div className="space-y-3">
                <SideBar></SideBar>
            </div>
        </div>
        <div className="container mx-auto mt-12">
            <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-1">
                
            {isLoading && <p>Loading data...</p>}
                {apidata && (
                    <DataTable
                    columns={columns}
                    data={apidata}
                   pagination
                />
                )}
                {!isLoading && !apidata && <p>No data available yet.</p>}
            </div>
        </div>
    </div>
    
    )
    
    
    }