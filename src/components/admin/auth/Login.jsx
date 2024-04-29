
import { useDispatch, useSelector } from "react-redux";
import copy from "copy-to-clipboard";
// import { increment } from "../../features/counterSlice";
import { useNavigate } from 'react-router-dom'
import { useState,useEffect } from "react";
import { BASE_URI } from "../../../../config/keys-dev";
import { signin } from "../../../features/authSlice";


export default function ALogin() {
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [accessCode, setAccessCode] = useState(0);
  const [otp, setOtp] = useState(0);
  const [errormsg,setErrormsg]=useState("");
  const [signinRequestStatus,setSigninRequestStatus]=useState('idle');
  const navigate=useNavigate();
  const dispatch=useDispatch();

  const handleChange=(e)=>{
    const {name,value}=e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const copyToClipboard = () => {
    copy(accessCode);
    alert(`You have copied`);
};
  const getCurrentMinute = () => {
    const date = new Date();
    const minute = String(date.getMinutes()).padStart(2, '0');
    return minute;
  };

  const generateRandomNumber = () => {
    const randomNumber = Math.floor(Math.random() * 900) + 100; 
    return randomNumber.toString(10).padStart(3, '0');
  };

  const handleOtp= async (e)=>{
    e.preventDefault();
    try {
      setIsLoading(true)
     setSigninRequestStatus('pending')
     const frmData = new FormData();
     frmData.append('code',accessCode);
     frmData.append('otp',otp)
     const response = await fetch(`${BASE_URI}api/admin/verifyotp`,{method: 'post',body:frmData});
     const fetchedData = await response.json();
     const data= fetchedData.data.resp;
     if (data){
      const resp = await dispatch(signin(formData)).unwrap();
      const q=resp.data.data.data;
      console.log(resp.data.data.data.atab )
      localStorage.setItem("atoken",resp.data.data.token)
      if(q.sup==5){
        localStorage.setItem("asup",q.sup)
      }else{
        localStorage.setItem("_t",q.atab)
        localStorage.setItem("_d",q.dTile)
        localStorage.setItem("_r",q.rTile)
      }
      setShowModal(false)
     navigate('/adashboard')
     }else{
      setErrormsg("Otp validation failed")
     }
   } catch (err) {
     console.log(err,"errrrr")
     setErrormsg("Otp validation failed")
   } finally {
     setSigninRequestStatus('idle')
     setIsLoading(false)
   }
  }
  
  const handleLogin =async (e) => {
    // console.log("hann",e,"jjjdata",formData)
      e.preventDefault();
        try {
           setIsLoading(true)
          setSigninRequestStatus('pending')
          const response = await dispatch(signin(formData)).unwrap();
          setAccessCode(`${generateRandomNumber()}${getCurrentMinute()}`);

          setShowModal(true)
         
         // console.log(response.token,"resppppp")
         // localStorage.setItem("atoken",response.token)
          //navigate('/adashboard')
        } catch (err) {
          console.log(err,"errrrr")
          //setSigninRequestStatus('idle')
          // console.error(err.response.data.errors)
          setErrormsg(err.response.data.errors)
        } finally {
          setSigninRequestStatus('idle')
          setIsLoading(false)
        }
    };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
  <div className="relative py-3 sm:max-w-xl sm:mx-auto">
    <div
      className="absolute inset-0 bg-gradient-to-r from-lime-400 to-green-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
    </div>
    <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
    <form onSubmit={handleLogin}>
      <div className="max-w-md mx-auto">
        <div>
          <h1 className="text-2xl font-semibold">Login</h1>
           {/* <h1>{count1}</h1> */}
          {/* <button onClick={()=>dispatch(increment())}>add</button> */}
        </div>
      
        <div className="divide-y divide-gray-200">
          <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
            <p className="text-red-700">{errormsg}</p>
            <div className="relative">
              <input autoComplete="off" id="email" value={formData.username} onChange={handleChange} name="username" type="text" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="username" />
              <label htmlFor="email" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Username</label>
            </div>
            <div className="relative">
              <input autoComplete="off" id="password" value={formData.password} onChange={handleChange} name="password" type="password" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Password" />
              <label htmlFor="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
            </div>
            <div className="relative">
              <button type="submit" className="bg-green-500 text-white rounded-md px-2 py-1">{isLoading ? 'Processing...' : 'Submit'}</button>
            </div>
          </div>
        </div>
      </div>
    </form>

      <div className="w-full flex justify-center">
      {showModal ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                  <h3 className="text-3xl font=semibold">Validate Otp</h3>
                  {/* <button
                    className="bg-transparent border-0 text-black float-right"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="text-black opacity-7 h-6 w-6 text-xl block bg-gray-400 py-0 rounded-full">
                      x
                    </span>
                  </button> */}
                </div>
                <p className="text-red-700">{errormsg}</p>
                <div className="relative p-6 flex-auto">
                  <form className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full">
                    <label className="block text-black text-sm font-bold mb-1">
                      Acess Code:
                    </label>
                    
                    <input className="col-span-6 bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"  placeholder="Otp"  name="accesscode" value={accessCode} disabled readOnly/>
                    <label className="block text-black text-sm font-bold mb-1">
                      Otp
                    </label>
                    <input placeholder="Otp"  name="otp" value={otp}  onChange={(e)=>setOtp(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-1 text-black" />
                    
                  </form>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                <button
                    onClick={copyToClipboard}  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                  >
                    Copy Code
                  </button>
                  <button
                    className="text-white bg-yellow-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={handleOtp}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
        
        {/* <a  sfsf wrwr className="text-indigo-700 hover:text-pink-700 text-sm float-right" href="/register">Create Account</a> */}
        {/* <a className="text-indigo-700 hover:text-pink-700 text-sm float-left" href="#">Forgot Password?</a><br></br> */}

      </div>

    </div>
  </div>
</div>
    
  );
}
