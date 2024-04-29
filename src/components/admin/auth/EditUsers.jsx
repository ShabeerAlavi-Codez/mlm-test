import { useState,useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate,useLocation } from 'react-router-dom'
import { BASE_URI} from '../../../../config/keys-dev';
 import SideBar from "./SideBar";
 import { edituser } from "../../../features/authSlice";

export default function EditUser() {
  const location = useLocation();
    const [apidata, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({ 
      userId:location.state._id,
      username: location.state.username,
        password: '',
        mobile:location.state.mobile,
        atab:location.state.atab,
        sup:location.state.sup,
        dTile:location.state.dTile,
        rTile:location.state.rTile});
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

  

      const onUserEdit =async (e)=>{
        e.preventDefault();
        try {
           setIsLoading(true)
          const response = await dispatch(edituser(formData)).unwrap();
          console.log("errrrr",formData)
        navigate("/umgt")
        } catch (err) {
          console.log(err,"errrrr")
          //setSigninRequestStatus('idle')
          // console.error(err.response.data.errors)
        } finally {
          setIsLoading(false)
        }

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
           
         
                  
                    <div style={{flex:1, flexDirection:"row"}}>
                       
                <h1 className="text-3xl font-bold">EDIT USER SECTION</h1>
                <form onSubmit={onUserEdit}>
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
                 <input type="checkbox" id="name"  name="sup" value={5} onChange={onChangeSChk}  checked={formData.sup==5}   className="border-gray-300 rounded h-5 ml-4 w-5"/>
                    </div>
                    <div className='row' style={{ display: sl1_1 ? '' : 'none' }} id='l1-1'>
                    <h1 className="text-gray-700 text-lg leading-none">Active Tabs</h1>
                    <div>
                <label for="name" className="w-20 inline-block text-right  font-bold mr-4  text-gray-500 text-gray-500">Node Tree</label>
                 <input type="checkbox" id="name" name="atab" value={"t1"} onChange={onChangeChk}  checked={formData.atab.includes("t1")}   className="border-gray-300 rounded h-5 ml-4 w-5"/>
                  
                    
                <label for="name" className="w-20 inline-block text-right  font-bold mr-4  text-gray-500 text-gray-500">Approval</label>
                 <input type="checkbox" id="name"  name="atab" value={"t2"}  checked={formData.atab.includes("t2")}  onChange={onChangeChk}  className="border-gray-300 rounded h-5 ml-4 w-5"/>
                    
                    
                <label for="name" className="w-20 inline-block text-right  font-bold mr-4  text-gray-500 text-gray-500">Settings</label>
                 <input type="checkbox" id="name"  name="atab" value={"t3"}  checked={formData.atab.includes("t3")}  onChange={onChangeChk}   className="border-gray-300 rounded h-5 ml-4 w-5"/>
                    
                  
                <label for="name" className="w-20 inline-block text-right  font-bold mr-4  text-gray-500 text-gray-500">Reports</label>
                 <input type="checkbox" id="name"  name="atab" value={"t4"}  checked={formData.atab.includes("t4")}  onChange={onChangeChk}  className="border-gray-300 rounded h-5 ml-4 w-5"/>
                    </div>
                    <h1 className="text-gray-700 text-lg leading-none">Active Dashboard tiles  :</h1>
                    <div>
                <label for="name" className="w-20  text-right  font-bold mr-1 text-gray-500 text-gray-500">Total Node users </label>
                 <input type="checkbox" id="name"  name="dTile" value={"d1"} onChange={onChangeChk}  className="border-gray-300 rounded h-5 ml-4 w-5"  checked={formData.dTile.includes("d1")} />
                  
                    
                <label for="name" className="w-20  text-right  font-bold ml-4  text-gray-500 text-gray-500">Ist Payment Pending</label>
                 <input type="checkbox" id="name" name="dTile" value={"d2"} onChange={onChangeChk}  className="border-gray-300 rounded h-5 ml-4 w-5" checked={formData.dTile.includes("d2")}/>
                    
                    
                <label for="name" className="w-20  text-right  font-bold ml-4  text-gray-500 text-gray-500">Ist Payment Approval</label>
                 <input type="checkbox" id="name" name="dTile" value={"d3"} onChange={onChangeChk}  className="border-gray-300 rounded h-5 ml-4 w-5" checked={formData.dTile.includes("d3")}/>
                    
                  
                <label for="name" className="w-20  text-right  font-bold ml-4  text-gray-500 text-gray-500">IIst Payment for approval</label>
                 <input type="checkbox" id="name" name="dTile" value={"d4"} onChange={onChangeChk}  className="border-gray-300 rounded h-5 ml-4 w-5" checked={formData.dTile.includes("d4")}/>

                 <label for="name" className="w-20  text-right  font-bold ml-4  text-gray-500 text-gray-500">IIst Payment Pending</label>
                 <input type="checkbox" id="name" name="dTile" value={"d5"} onChange={onChangeChk}  className="border-gray-300 rounded h-5 ml-4 w-5" checked={formData.dTile.includes("d5")}/>
                    
                    
                <label for="name" className="w-20  text-right  font-bold ml-4  text-gray-500 text-gray-500">Tasks Progressing /Active Users</label>
                 <input type="checkbox" id="name" name="dTile" value={"d6"} onChange={onChangeChk}  className="border-gray-300 rounded h-5 ml-4 w-5" checked={formData.dTile.includes("d6")}/>
                    
                  
                <label for="name" className="w-20  text-right  font-bold ml-4  text-gray-500 text-gray-500">Tasks Completed Users</label>
                 <input type="checkbox" id="name" name="dTile" value={"d7"} onChange={onChangeChk}  className="border-gray-300 rounded h-5 ml-4 w-5" checked={formData.dTile.includes("d7")}/>
                    </div>

                    <h1 className="text-gray-700 text-lg leading-none">Report tiles  :</h1>
                    <div>
                <label for="name" className="w-20  text-right  font-bold mr-1 text-gray-500 text-gray-500">Total Node users </label>
                 <input type="checkbox" id="name" name="rTile" value={"r1"} onChange={onChangeChk}  className="border-gray-300 rounded h-5 ml-4 w-5" checked={formData.rTile.includes("r1")}/>
                  
                    
                <label for="name" className="w-20  text-right  font-bold ml-4  text-gray-500 text-gray-500">Ist Payment Pending</label>
                 <input type="checkbox" id="name"  name="rTile" value={"r2"} onChange={onChangeChk}   className="border-gray-300 rounded h-5 ml-4 w-5" checked={formData.rTile.includes("r2")} />
                    
                    
                <label for="name" className="w-20  text-right  font-bold ml-4  text-gray-500 text-gray-500">Ist Payment Approval</label>
                 <input type="checkbox" id="name"  name="rTile" value={"r3"} onChange={onChangeChk}   className="border-gray-300 rounded h-5 ml-4 w-5" checked={formData.rTile.includes("r3")}/>
                    
                  
                <label for="name" className="w-20  text-right  font-bold ml-4  text-gray-500 text-gray-500">IIst Payment for approval</label>
                 <input type="checkbox" id="name"  name="rTile" value={"r4"} onChange={onChangeChk}   className="border-gray-300 rounded h-5 ml-4 w-5" checked={formData.rTile.includes("r4")}/>

                 <label for="name" className="w-20  text-right  font-bold ml-4  text-gray-500 text-gray-500">IIst Payment Pending</label>
                 <input type="checkbox" id="name"  name="rTile" value={"r5"} onChange={onChangeChk}   className="border-gray-300 rounded h-5 ml-4 w-5" checked={formData.rTile.includes("r5")}/>
                    
                    
                <label for="name" className="w-20  text-right  font-bold ml-4  text-gray-500 text-gray-500">Tasks Progressing /Active Users</label>
                 <input type="checkbox" id="name"  name="rTile" value={"r6"} onChange={onChangeChk}   className="border-gray-300 rounded h-5 ml-4 w-5" checked={formData.rTile.includes("r6")}/>
                    
                  
                <label for="name" className="w-20  text-right  font-bold ml-4  text-gray-500 text-gray-500">Tasks Completed Users</label>
                 <input type="checkbox" id="name"  name="rTile" value={"r7"} onChange={onChangeChk}   className="border-gray-300 rounded h-5 ml-4 w-5" checked={formData.rTile.includes("r7")}/>
                    </div>
                  </div>
                <button type="submit" className='mt-5 text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"'>
                    Edit user
                </button>
                </form>
                </div>
              
            </div>

            </div>
        </div>
    </div>
    
    )
    }