import { useDispatch, useSelector } from "react-redux";
// import { increment } from "../../features/counterSlice";
import { useNavigate } from 'react-router-dom'
import { useState } from "react";
import { signin } from "../../features/registerSlice";
import Logo3 from '../../assets/logo4.png'
import img1 from '../../assets/image2.jpeg'


export default function Login() {
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
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
  const handleLogin =async (e) => {
    console.log("hann",e,"jjjdata",formData)
      e.preventDefault();
        try {
           setIsLoading(true)
          setSigninRequestStatus('pending')
          const response = await dispatch(signin(formData)).unwrap();
          setFormData({
          email: '',
          password: ''})
         // console.log(response.token,"resppppp")
          localStorage.setItem("token",response.token)
          localStorage.setItem('_i',response._id)
          localStorage.setItem('_n',response.name)
          localStorage.setItem('_e',response.email)
          localStorage.setItem('_m',response.mobile)
           navigate('/udashboard')
        } catch (err) {
          console.log(err,"errrrr")
          //setSigninRequestStatus('idle')
          // console.error(err.response.data.errors)
          setErrormsg(err.response.data.errors)
          // if(err.response.data.info){
          //   navigate('/smaintance')
          // }
        } finally {
          setSigninRequestStatus('idle')
          setIsLoading(false)
        }
    };

  
  return (
    <>

<div className="min-h-screen bg-gray-800 text-gray-100 flex justify-center">
    <div className="order-2 sm:order-1 max-w-screen-xl m-0 sm:m-10 bg-gray-900 shadow sm:rounded-lg flex justify-center flex-1">
        <div className=" lg:w-1/2 xl:w-5/12 p-6  sm:p-6">
            <div>
                <img src={Logo3} className="w-72 mx-auto" />
            </div>
            <div className="mt-12 flex flex-col items-center">
                <h1 className="text-2xl xl:text-3xl font-extrabold">Sign up</h1>
                <div className="w-full flex-1 mt-8">
                    <div className="mx-auto max-w-xs">
                        <input
                            className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                            type="email" placeholder="Email" />
                        <input
                            className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                            type="password" placeholder="Password" />
                        <button
                            className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                            <svg className="w-6 h-6 -ml-2" fill="none" stroke="currentColor" strokeWidth="2"
                                strokeLinecap="round" strokeLinejoin="round">
                                <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                <circle cx="8.5" cy="7" r="4" />
                                <path d="M20 8v6M23 11h-6" />
                            </svg>
                            <span className="ml-3">Sign Up</span>
                        </button>
                        {/* <p className="mt-6 text-xs text-gray-600 text-center">
                            I agree to abide by Templatana's
                            <a href="#" className="border-b border-gray-500 border-dotted">Terms of Service</a>
                            and its
                            <a href="#" className="border-b border-gray-500 border-dotted">Privacy Policy</a>
                        </p> */}
                    </div>
                </div>
            </div>
        </div>
        <div className="absolute bottom-10 s order-1 sm:order-2  flex-1 text-center lg:hidden">
            <div className=" m-6  xl:m-16  rounded-lg bg-contain bg-center bg-no-repeat"
                style={{backgroundImage: `url(${img1})`, backgroundSize: 'cover', height:250,width:250, backgroundPosition: 'center'}}>
                <div style={{color: 'white', fontWeight: 'bold', fontSize: '2rem'}}>
                    {/* Your Trust, Our Priority:
                    Crafting a Future Together */}
                </div>
            </div>
        </div>
        <div className="order-1 sm:order-2 flex-1 text-center hidden lg:flex">
            <div className="m-12 xl:m-16 w-full rounded-lg  bg-contain bg-center bg-no-repeat"
                style={{backgroundImage: `url(${img1})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
                <div style={{color: 'white', fontWeight: 'bold', fontSize: '2rem'}}>
                    Your Trust, Our Priority: Crafting a Future Together
                </div>
            </div>
        </div>
       
    </div>
    <div className="absolute bottom-5 text-center" >
           <marquee><h2 className="text-sm text-gray-500"style={{color: 'white', fontWeight: 'bold', fontSize: '1rem'}}>📱✨ Exciting news ahead! 🚀 Stay tuned for our iOS and Android app! 🎉</h2></marquee> 
        </div>
</div>


{/* 
      <div className="mt-12 text-center">
            <h2 className="text-sm text-gray-500">📱✨ Exciting news ahead! 🚀 Stay tuned for our iOS and Android app! 🎉</h2>
        </div>
        <div className="relative mx-auto w-full max-w-md bg-dark px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10 border-2 border-blue-500 ">

    
    <div className="w-full">
        <div className="text-center">
            <h1 className="text-3xl font-semibold text-gray-900">Sign in</h1>
            <p className="mt-2 text-gray-500">Sign in below to access your account</p>
        </div>
        <div className="mt-5">
            <form onSubmit={handleLogin}>
            <p classNameName="text-red-700 text-center">{errormsg}</p>

                <div className="relative mt-6">
                    <input type="email" id="email" value={formData.email} onChange={handleChange} name="email" placeholder="Email Address" className="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none" autocomplete="NA" required />
                    <label for="email" className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">Email Address</label>
                </div>
                <div className="relative mt-6">
                    <input type="password" autoComplete="off" id="password" value={formData.password} onChange={handleChange} name="password" placeholder="Password" className="peer peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none" required />
                    <label for="password" className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">Password</label>
                </div>
                <div className="my-6">
                    <button type="submit" className="w-full rounded-md bg-black px-3 py-4 text-white focus:bg-gray-600 focus:outline-none hover:bg-blue-800">{isLoading ? 'Processing...' : 'Sign in'}</button>
                </div>
                <p className="text-center text-sm text-gray-500">Don&#x27;t have an account yet?
                    <a href="/register"
                        className="font-semibold text-gray-600 hover:underline focus:text-gray-800 focus:outline-none"> Sign
                        up
                    </a>.
                </p>
            </form>
        </div>
    </div>
</div>
     */}

    {/* ddddddddddddddddddd */}
        {/* <div classNameName="min-h-screen bg-gray-100 py-6 flex flex-col justify-center  sm:py-6">
  <div classNameName="relative py-3 sm:max-w-xl sm:mx-auto">
    <div
      classNameName="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
    </div>
    <div classNameName="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
    <form onSubmit={handleLogin}>
      <div classNameName="max-w-md mx-auto">
        <div>
          <h1 classNameName="text-2xl font-semibold">Login</h1> */}
           {/* <h1>{count1}</h1> */}
          {/* <button onClick={()=>dispatch(increment())}>add</button> */}
        {/* </div>
      
        <div classNameName="divide-y divide-gray-200">
          <div classNameName="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
            <p classNameName="text-red-700">{errormsg}</p>
            <div classNameName="relative">
              <input autoComplete="off" id="email" value={formData.email} onChange={handleChange} name="email" type="text" classNameName="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Email address" />
              <label htmlFor="email" classNameName="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Email Address</label>
            </div>
            <div classNameName="relative">
              <input autoComplete="off" id="password" value={formData.password} onChange={handleChange} name="password" type="password" classNameName="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Password" />
              <label htmlFor="password" classNameName="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
            </div>
            <div classNameName="relative">
              <button type="submit" classNameName="bg-cyan-500 text-white rounded-md px-2 py-1">{isLoading ? 'Processing...' : 'Submit'}</button>
            </div>
          </div>
        </div>
      </div>
    </form>

      <div classNameName="w-full flex justify-center">
        
        <a classNameName="text-indigo-700 hover:text-pink-700 text-sm float-right" href="/register">Create Account</a> */}
        {/* <a classNameName="text-indigo-700 hover:text-pink-700 text-sm float-left" href="#">Forgot Password?</a><br></br> */}

      {/* </div>

    </div>
  </div>
</div> */}
    </>
   
    
  );
}
