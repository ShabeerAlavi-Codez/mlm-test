import { useState,useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom'
import { BASE_URI} from '../../../../config/keys-dev';
 import SideBar from "./SideBar";
 import { signup } from "../../../features/authSlice";
 import DataTable from 'react-data-table-component'; 

export default function Users() {
    const [apidata, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
      username: '',
      password: '',
      mobile:'',
      atab:[],
      sup:0,
      dTile:[],
      rTile:[]
    });
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const [sl1_1,setSl1_1]= useState(true);
    const handleChange=(e)=>{
      const {name,value}=e.target;
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
    const onChangeSChk=(event)=>{
      if (event.target.name === "sup" && event.target.checked) {
        setFormData(prevState => ({
              ...prevState,
              sup: 5
          }));
          setSl1_1(false);
      } else if (event.target.name === "sup" && !event.target.checked) {
        setFormData(prevState => ({
              ...prevState,
              sup: 1
          }));
          setSl1_1(true);
    }
  }
    const onChangeChk = (event) => {
      if (event.target.name === "atab" && event.target.checked) {
        setFormData(prevState => ({
              ...prevState,
              atab: [...prevState.atab, event.target.value]
          }));
      } else if (event.target.name === "atab" && !event.target.checked) {
        setFormData(prevState => ({
              ...prevState,
              atab: prevState.atab.filter(item => item !== event.target.value)
          }));
        } else if (event.target.name === "dTile" && event.target.checked) {
          setFormData(prevState => ({
                ...prevState,
                dTile: [...prevState.dTile, event.target.value]
            }));
        } else if (event.target.name === "dTile" && !event.target.checked) {
          setFormData(prevState => ({
                ...prevState,
                dTile: prevState.dTile.filter(item => item !== event.target.value)
            }));
          } else if (event.target.name =="rTile" && event.target.checked) {
            setFormData(prevState => ({
                  ...prevState,
                  rTile: [...prevState.rTile, event.target.value]
              }));
          } else if (event.target.name === "rTile" && !event.target.checked) {
            setFormData(prevState => ({
                  ...prevState,
                  rTile: prevState.rTile.filter(item => item !== event.target.value)
              }));
            }
      }

    const [cmpUpiId,setCmpUpiId]=useState('');

    useEffect(() => {
        const fetchData = async () => {
          setIsLoading(true); // Set loading state to true
          try {
            const response = await fetch(`${BASE_URI}api/admin/userlist`);
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

      const onUserAdd =async (e)=>{
        e.preventDefault();
        try {
           setIsLoading(true)
         const response = await dispatch(signup(formData)).unwrap();
          //console.log("errrrr",formData)
          window.location.reload()
        } catch (err) {
          console.log(err,"errrrr")
          //setSigninRequestStatus('idle')
          // console.error(err.response.data.errors)
        } finally {
          setIsLoading(false)
        }

      }
      const onchangeUpi=(e)=>{
        setCmpUpiId(e.target.value)
      }
     const handleDelete =async(row)=>{
      console.log("dd",row)
      const response = await fetch(`${BASE_URI}api/admin/delUser/${row._id}`);
      console.log("dd",row)
      window.location.reload()
     }
     const handleEdit =(row)=>{
      navigate("/edituser",{state:row})
      console.log("edit")
     }
      const columns = [
        {
            name: 'Username',
            selector: row => row.username,
            sortable: true,
        },
        {
            name: 'type',
            selector: row => { if(row.sup==5){return "Super Admin"}else{ return "other"}},
            sortable: true,
        },
        {
            name: 'mobile',
            selector: row => row.mobile,
            sortable: true,
        },
        {
          name: 'Edit',
          cell: (row) => (
              <div>
              <button onClick={() => handleEdit(row)} className='text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"' >Edit</button>
              </div>
          ),
      },
      {
          name: 'Delete',
          cell: (row) => (
              <div>
              <button onClick={() => handleDelete(row)} className='text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900 mt-2'>Delete</button>
          </div>
          ),
      }
    ];
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
                  
                    <div style={{flex:1, flexDirection:"row"}}>
                       <DataTable
                    // title="Node List"
                    columns={columns}
                    data={ apidata}
                    subHeader
                   // subHeaderComponent={subHeaderComponent}
                    pagination
                />
                <h1 className="text-3xl font-bold">ADD USER SECTION</h1>
                <form onSubmit={onUserAdd}>
                <div>
                <label for="name" class="block mb-2 font-bold text-gray-600">Username</label>
                 <input type="text" id="name" value={formData.username} onChange={handleChange} name="username" placeholder="Username" className="border border-gray-300 shadow p-3 w-600 rounded mb-"/>
                </div>
                <div>
                <label for="pass" class="block mb-2 font-bold text-gray-600">Password</label>
                 <input type="text" id="pass"  value={formData.password} onChange={handleChange} name="password"  className="border border-gray-300 shadow p-3 w-600 rounded mb-4"/>
                </div>
                <div>
                <label for="pass" className="block mb-2 font-bold text-gray-600">Mobile</label>
                 <input type="text" id="pass"  value={formData.mobile} onChange={handleChange} name="mobile"  class="border border-gray-300 shadow p-3 w-600 rounded mb-4"/>
                </div>
                <div>
                <label for="name" className="w-20 inline-block text-right  font-bold mr-4  text-gray-500 text-gray-500">SuperAdmin</label>
                 <input type="checkbox" id="name"  name="sup" value={5} onChange={onChangeSChk}   className="border-gray-300 rounded h-5 ml-4 w-5"/>
                    </div>
                    <div className='row' style={{ display: sl1_1 ? '' : 'none' }} id='l1-1'>
                    <h1 className="text-gray-700 text-lg leading-none">Active Tabs</h1>
                    <div>
                <label for="name" className="w-20 inline-block text-right  font-bold mr-4  text-gray-500 text-gray-500">Node Tree</label>
                 <input type="checkbox" id="name" name="atab" value={"t1"} onChange={onChangeChk}   className="border-gray-300 rounded h-5 ml-4 w-5"/>
                  
                    
                <label for="name" className="w-20 inline-block text-right  font-bold mr-4  text-gray-500 text-gray-500">Approval</label>
                 <input type="checkbox" id="name"  name="atab" value={"t2"} onChange={onChangeChk}  className="border-gray-300 rounded h-5 ml-4 w-5"/>
                    
                    
                <label for="name" className="w-20 inline-block text-right  font-bold mr-4  text-gray-500 text-gray-500">Settings</label>
                 <input type="checkbox" id="name"  name="atab" value={"t3"} onChange={onChangeChk}   className="border-gray-300 rounded h-5 ml-4 w-5"/>
                    
                  
                <label for="name" className="w-20 inline-block text-right  font-bold mr-4  text-gray-500 text-gray-500">Reports</label>
                 <input type="checkbox" id="name"  name="atab" value={"t4"} onChange={onChangeChk}  className="border-gray-300 rounded h-5 ml-4 w-5"/>
                    </div>
                    <h1 className="text-gray-700 text-lg leading-none">Active Dashboard tiles  :</h1>
                    <div>
                <label for="name" className="w-20  text-right  font-bold mr-1 text-gray-500 text-gray-500">Total Node users </label>
                 <input type="checkbox" id="name"  name="dTile" value={"d1"} onChange={onChangeChk}  className="border-gray-300 rounded h-5 ml-4 w-5"/>
                  
                    
                <label for="name" className="w-20  text-right  font-bold ml-4  text-gray-500 text-gray-500">Ist Payment Pending</label>
                 <input type="checkbox" id="name" name="dTile" value={"d2"} onChange={onChangeChk}  className="border-gray-300 rounded h-5 ml-4 w-5"/>
                    
                    
                <label for="name" className="w-20  text-right  font-bold ml-4  text-gray-500 text-gray-500">Ist Payment Approval</label>
                 <input type="checkbox" id="name" name="dTile" value={"d3"} onChange={onChangeChk}  className="border-gray-300 rounded h-5 ml-4 w-5"/>
                    
                  
                <label for="name" className="w-20  text-right  font-bold ml-4  text-gray-500 text-gray-500">IIst Payment for approval</label>
                 <input type="checkbox" id="name" name="dTile" value={"d4"} onChange={onChangeChk}  className="border-gray-300 rounded h-5 ml-4 w-5"/>

                 <label for="name" className="w-20  text-right  font-bold ml-4  text-gray-500 text-gray-500">IIst Payment Pending</label>
                 <input type="checkbox" id="name" name="dTile" value={"d5"} onChange={onChangeChk}  className="border-gray-300 rounded h-5 ml-4 w-5"/>
                    
                    
                <label for="name" className="w-20  text-right  font-bold ml-4  text-gray-500 text-gray-500">Tasks Progressing /Active Users</label>
                 <input type="checkbox" id="name" name="dTile" value={"d6"} onChange={onChangeChk}  className="border-gray-300 rounded h-5 ml-4 w-5"/>
                    
                  
                <label for="name" className="w-20  text-right  font-bold ml-4  text-gray-500 text-gray-500">Tasks Completed Users</label>
                 <input type="checkbox" id="name" name="dTile" value={"d7"} onChange={onChangeChk}  className="border-gray-300 rounded h-5 ml-4 w-5"/>
                    </div>

                    <h1 className="text-gray-700 text-lg leading-none">Report tiles  :</h1>
                    <div>
                <label for="name" className="w-20  text-right  font-bold mr-1 text-gray-500 text-gray-500">Total Node users </label>
                 <input type="checkbox" id="name" name="rTile" value={"r1"} onChange={onChangeChk}  className="border-gray-300 rounded h-5 ml-4 w-5"/>
                  
                    
                <label for="name" className="w-20  text-right  font-bold ml-4  text-gray-500 text-gray-500">Ist Payment Pending</label>
                 <input type="checkbox" id="name"  name="rTile" value={"r2"} onChange={onChangeChk}   className="border-gray-300 rounded h-5 ml-4 w-5"/>
                    
                    
                <label for="name" className="w-20  text-right  font-bold ml-4  text-gray-500 text-gray-500">Ist Payment Approval</label>
                 <input type="checkbox" id="name"  name="rTile" value={"r3"} onChange={onChangeChk}   className="border-gray-300 rounded h-5 ml-4 w-5"/>
                    
                  
                <label for="name" className="w-20  text-right  font-bold ml-4  text-gray-500 text-gray-500">IIst Payment for approval</label>
                 <input type="checkbox" id="name"  name="rTile" value={"r4"} onChange={onChangeChk}   className="border-gray-300 rounded h-5 ml-4 w-5"/>

                 <label for="name" className="w-20  text-right  font-bold ml-4  text-gray-500 text-gray-500">IIst Payment Pending</label>
                 <input type="checkbox" id="name"  name="rTile" value={"r5"} onChange={onChangeChk}   className="border-gray-300 rounded h-5 ml-4 w-5"/>
                    
                    
                <label for="name" className="w-20  text-right  font-bold ml-4  text-gray-500 text-gray-500">Tasks Progressing /Active Users</label>
                 <input type="checkbox" id="name"  name="rTile" value={"r6"} onChange={onChangeChk}   className="border-gray-300 rounded h-5 ml-4 w-5"/>
                    
                  
                <label for="name" className="w-20  text-right  font-bold ml-4  text-gray-500 text-gray-500">Tasks Completed Users</label>
                 <input type="checkbox" id="name"  name="rTile" value={"r7"} onChange={onChangeChk}   className="border-gray-300 rounded h-5 ml-4 w-5"/>
                    </div>
                  </div>
                <button type="submit" className='mt-5 text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"'>
                    Add User
                </button>
                </form>
                </div>
              

                
                 
                )}
                {!isLoading && !apidata && <p>No data available yet.</p>}
              
              
            </div>

            </div>
        </div>
    </div>
    
    )
    }