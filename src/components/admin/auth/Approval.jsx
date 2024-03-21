import { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component'; 
import { addNode,rejCmp } from "../../../features/nodelistSlice";
import { BASE_URI} from '../../../../config/keys-dev';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';



export default function Approval() {
    const dispatch=useDispatch()
    const navigate =useNavigate()
    const [apidata, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [refresh,setRefresh]=useState(false);
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

  const handleApprove =async (row)=>{
       
    try {
        setIsLoading(true);
        let formData={
            userId: row.userId,
            name: row.name,
            mobile:row.mobile,
            upiId: row.upiId,
            payment_status:row.payment_status 


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
            cell: (row) => (
                <img
                    src={`${BASE_URI}uploads/${row.userId}.png`}
                    alt="User Image"
                    style={{ width: '50px', height: '50px', cursor: 'pointer' }}
                   // onClick={() => handleImageClick(row.userId)}
                />
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
                <div className="flex items-center">
                    <h2 className="text-xl font-bold text-white">Admin Panel</h2>
                </div>
                <div className="flex-1">
                    <ul className="pt-2 pb-4 space-y-1 text-sm">
                        <li className="rounded-sm">
                            <a
                                href="/adashboard"
                                className="flex items-center p-2 space-x-3 rounded-md"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6 text-gray-100"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                    />
                                </svg>
                                <span className="text-gray-100">Home</span>
                            </a>
                        </li>
                        <li className="rounded-sm">
                            <a
                                href="/nodeview"
                                className="flex items-center p-2 space-x-3 rounded-md"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6 text-gray-100"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M10 2c.552 0 1 .448 1 1v4c0 .552-.448 1-1 1H8v2h5V9c0-.552.448-1 1-1h6c.552 0 1 .448 1 1v4c0 .552-.448 1-1 1h-6c-.552 0-1-.448-1-1v-1H8v6h5v-1c0-.552.448-1 1-1h6c.552 0 1 .448 1 1v4c0 .552-.448 1-1 1h-6c-.552 0-1-.448-1-1v-1H7c-.552 0-1-.448-1-1V8H4c-.552 0-1-.448-1-1V3c0-.552.448-1 1-1h6zm9 16h-4v2h4v-2zm0-8h-4v2h4v-2zM9 4H5v2h4V4z"
                                    />
                                </svg>
                                <span className="text-gray-100">Node Tree</span>
                            </a>
                        </li>
                        <li className="rounded-sm">
                            <a
                                href="/approval"
                                className="flex items-center p-2 space-x-3 rounded-md"
                            >
                                {/* <svg width="100px" 
                                height="100px" 
                                viewBox="0 0 24 24" className="w-6 h-6 text-gray-100"  version="1.1" xmlns="http://www.w3.org/2000/svg">
                                <path d="M512 64l100.266667 76.8 123.733333-17.066667 46.933333 117.333334 117.333334 46.933333-17.066667 123.733333L960 512l-76.8 100.266667 17.066667 123.733333-117.333334 46.933333-46.933333 117.333334-123.733333-17.066667L512 960l-100.266667-76.8-123.733333 17.066667-46.933333-117.333334-117.333334-46.933333 17.066667-123.733333L64 512l76.8-100.266667-17.066667-123.733333 117.333334-46.933333 46.933333-117.333334 123.733333 17.066667z" fill="#8BC34A" /><path d="M738.133333 311.466667L448 601.6l-119.466667-119.466667-59.733333 59.733334 179.2 179.2 349.866667-349.866667z" fill="#CCFF90" /></svg> */}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6 text-gray-100"
                                    fill="none"
                                    viewBox="0 0 52 52"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="m45.2 29.2h-8.8c-2.6 0-4.8-2.2-4.8-4.8 0.4-7.1 3.7-7.5 4-12.1 0.3-4.8-2.7-9.1-7.4-10.1-6.2-1.3-11.8 3.4-11.8 9.4 0 5.3 3.6 5.3 4 12.8 0 2.6-2.2 4.8-4.8 4.8h-8.8c-2.6 0-4.8 2.1-4.8 4.8v3.2c0 0.9 0.7 1.6 1.6 1.6h44.8c0.9 0 1.6-0.7 1.6-1.6v-3.2c0-2.7-2.2-4.8-4.8-4.8z m0.1 14.4h-38.6c-0.9 0-1.5 0.7-1.5 1.5v0.1c0 2.6 2.2 4.8 4.8 4.8h32.1c2.6 0 4.7-2.2 4.7-4.8v-0.1c0-0.8-0.7-1.5-1.5-1.5z" 
                                    />
                                </svg>
                                <span className="text-gray-100">Approval</span>
                            </a>
                        </li>
                        <li className="rounded-sm">
                            <a
                                href="#"
                                className="flex items-center p-2 space-x-3 rounded-md"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6 text-gray-100"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                                    />
                                </svg>
                                <span className="text-gray-100">Reports</span>
                            </a>
                        </li>
                        <li className="rounded-sm">
                            <a
                                href="/settings"
                                className="flex items-center p-2 space-x-3 rounded-md"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6 text-gray-100"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                </svg>
                                <span className="text-gray-100">Settings</span>
                            </a>
                        </li>
                        <li className="rounded-sm">
                            <a
                                href="#"
                                className="flex items-center p-2 space-x-3 rounded-md"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6 text-gray-100"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                                    />
                                </svg>
                                <span className="text-gray-100">Logout</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div className="container mx-auto mt-12">
            <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-1">
                
            {isLoading && <p>Loading data...</p>}
                {apidata && (
                    <DataTable
                    // title="Node List"
                    columns={columns}
                    data={apidata}
                   // expandableRows={true}
                  //  expandableRowsComponent={ExpandedComponent}
                   // expandOnRowClicked={true}
                    // expandOnRowDoubleClicked={expandOnRowDoubleClicked}
                    // expandableRowsHideExpander={expandableRowsHideExpander}
                   pagination
                />
                )}
                {!isLoading && !apidata && <p>No data available yet.</p>}
            </div>
        </div>
    </div>
    
    )
    
    
    }