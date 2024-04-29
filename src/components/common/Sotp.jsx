import { useDispatch, useSelector } from "react-redux";
import copy from "copy-to-clipboard";
import { BASE_URI} from '../../../config/keys-dev';
// import { increment } from "../../features/counterSlice";
import { useNavigate } from 'react-router-dom'
import { useState } from "react";

export default function Sotp() {
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [copyText, setCopyText] = useState("");
  const [formData, setFormData] = useState({
    code: '',
    otp:""
  });
  const [errormsg,setErrormsg]=useState("");
  const [signinRequestStatus,setSigninRequestStatus]=useState('idle');
  const navigate=useNavigate();
  const dispatch=useDispatch();

 

  const copyToClipboard = () => {
      copy(formData.otp);
      alert(`You have copied "${formData.otp}"`);
  };


  const handleChange=(e)=>{
    const {name,value}=e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  }
  const handleSubmit =async (e) => {
    // console.log("hann",e,"jjjdata",formData)
      e.preventDefault();
        try {
           setIsLoading(true)
          setSigninRequestStatus('pending')
          const frmData = new FormData();
          frmData.append('code',formData.code);
          const response = await fetch(`${BASE_URI}api/admin/getotpplus`,{method: 'post',body:frmData});
          const fetchedData = await response.json();
          const data= fetchedData.data;
          // const response = await dispatch(signin(formData)).unwrap();
          setFormData(prevState=>({
            ...prevState,
          otp: data}))
         // console.log(response.token,"resppppp")
        //  localStorage.setItem("atoken",response.token)
        //   navigate('/adashboard')
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
    <form onSubmit={handleSubmit}>
      <div className="max-w-md mx-auto">
        <div>
          <h1 className="text-2xl font-semibold text-cyan-500">Authenticator</h1>
           {/* <h1>{count1}</h1> */}
          {/* <button onClick={()=>dispatch(increment())}>add</button> */}
        </div>
      
        <div className="divide-y divide-gray-200">
          <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
            <p className="text-red-700">{errormsg}</p>
            <div className="relative">
              <input autoComplete="off" id="email" value={formData.code} onChange={handleChange} name="code" type="text" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Email address" />
              <label htmlFor="email" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Access Code</label>
            </div>
            {/* <div className="relative">
              <input autoComplete="off" id="password" value={formData.otp} onChange={handleChange} name="otp" type="type" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Password" readOnly />
              <label htmlFor="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">OTP</label>
            </div> */}
            <div className="relative">
            <label for="npm-install-copy-button" class="sr-only">Otp</label>
        <input id="npm-install-copy-button" type="text" class="col-span-6 bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" value={formData.otp}  placeholder="Otp" disabled readonly />
        <button onClick={copyToClipboard} data-copy-to-clipboard-target="npm-install-copy-button" data-tooltip-target="tooltip-copy-npm-install-copy-button" class="absolute end-2 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg p-2 inline-flex items-center justify-center">
            <span id="default-icon">
                <svg class="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                    <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z"/>
                </svg>
            </span>
            <span id="success-icon" class="hidden inline-flex items-center">
                <svg class="w-3.5 h-3.5 text-blue-700 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/>
                </svg>
            </span>
        </button>
        </div>
            <div className="relative">
              <button type="submit" className="bg-green-500 text-white rounded-md px-2 py-1">{isLoading ? 'Processing...' : 'Submit'}</button>
            </div>
          </div>
        </div>
      </div>
    </form>
      <div className="w-full flex justify-center">
        
        {/* <a  sfsf wrwr className="text-indigo-700 hover:text-pink-700 text-sm float-right" href="/register">Create Account</a> */}
        {/* <a className="text-indigo-700 hover:text-pink-700 text-sm float-left" href="#">Forgot Password?</a><br></br> */}

      </div>

    </div>
  </div>
</div>
    
  );
}
