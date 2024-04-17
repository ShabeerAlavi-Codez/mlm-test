import { useDispatch, useSelector } from "react-redux";
// import { increment } from "../../features/counterSlice";
import { useNavigate } from 'react-router-dom'
import { useState } from "react";
import { signin } from "../../features/registerSlice";
import Logo3 from '../../assets/logo3.png'
import img1 from '../../assets/image.png'


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

<div class="min-h-screen bg-gray-800 text-gray-100 flex justify-center">
    <div class="max-w-screen-xl  m-0 sm:m-10 bg-gray-900 shadow sm:rounded-lg flex justify-center flex-1">
        <div class="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div>
                <img src={Logo3}
                    class="w-32 mx-auto" />
            </div>
            <div class="mt-12 flex flex-col items-center">
                <h1 class="text-2xl xl:text-3xl font-extrabold">
                    Sign up
                </h1>
                <div class="w-full flex-1 mt-8">
                    

                    <div class="mx-auto max-w-xs">
                        <input
                            class="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                            type="email" placeholder="Email" />
                        <input
                            class="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                            type="password" placeholder="Password" />
                        <button
                            class="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                            <svg class="w-6 h-6 -ml-2" fill="none" stroke="currentColor" stroke-width="2"
                                stroke-linecap="round" stroke-linejoin="round">
                                <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                <circle cx="8.5" cy="7" r="4" />
                                <path d="M20 8v6M23 11h-6" />
                            </svg>
                            <span class="ml-3">
                                Sign Up
                            </span>
                        </button>
                        <p class="mt-6 text-xs text-gray-600 text-center">
                            I agree to abide by templatana's
                            <a href="#" class="border-b border-gray-500 border-dotted">
                                Terms of Service
                            </a>
                            and its
                            <a href="#" class="border-b border-gray-500 border-dotted">
                                Privacy Policy
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex-1 bg-indigo-100 text-center hidden lg:flex">
            <div class="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
               style={{backgroundImage: `url(${img1})`,backgroundSize: 'cover', backgroundPosition: 'center',}}>
            </div>
        </div>
    </div>
</div>

{/* 
      <div class="mt-12 text-center">
            <h2 class="text-sm text-gray-500">📱✨ Exciting news ahead! 🚀 Stay tuned for our iOS and Android app! 🎉</h2>
        </div>
        <div class="relative mx-auto w-full max-w-md bg-dark px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10 border-2 border-blue-500 ">

    
    <div class="w-full">
        <div class="text-center">
            <h1 class="text-3xl font-semibold text-gray-900">Sign in</h1>
            <p class="mt-2 text-gray-500">Sign in below to access your account</p>
        </div>
        <div class="mt-5">
            <form onSubmit={handleLogin}>
            <p className="text-red-700 text-center">{errormsg}</p>

                <div class="relative mt-6">
                    <input type="email" id="email" value={formData.email} onChange={handleChange} name="email" placeholder="Email Address" class="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none" autocomplete="NA" required />
                    <label for="email" class="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">Email Address</label>
                </div>
                <div class="relative mt-6">
                    <input type="password" autoComplete="off" id="password" value={formData.password} onChange={handleChange} name="password" placeholder="Password" class="peer peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none" required />
                    <label for="password" class="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">Password</label>
                </div>
                <div class="my-6">
                    <button type="submit" class="w-full rounded-md bg-black px-3 py-4 text-white focus:bg-gray-600 focus:outline-none hover:bg-blue-800">{isLoading ? 'Processing...' : 'Sign in'}</button>
                </div>
                <p class="text-center text-sm text-gray-500">Don&#x27;t have an account yet?
                    <a href="/register"
                        class="font-semibold text-gray-600 hover:underline focus:text-gray-800 focus:outline-none"> Sign
                        up
                    </a>.
                </p>
            </form>
        </div>
    </div>
</div>
     */}

    {/* ddddddddddddddddddd */}
        {/* <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center  sm:py-6">
  <div className="relative py-3 sm:max-w-xl sm:mx-auto">
    <div
      className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
    </div>
    <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
    <form onSubmit={handleLogin}>
      <div className="max-w-md mx-auto">
        <div>
          <h1 className="text-2xl font-semibold">Login</h1> */}
           {/* <h1>{count1}</h1> */}
          {/* <button onClick={()=>dispatch(increment())}>add</button> */}
        {/* </div>
      
        <div className="divide-y divide-gray-200">
          <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
            <p className="text-red-700">{errormsg}</p>
            <div className="relative">
              <input autoComplete="off" id="email" value={formData.email} onChange={handleChange} name="email" type="text" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Email address" />
              <label htmlFor="email" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Email Address</label>
            </div>
            <div className="relative">
              <input autoComplete="off" id="password" value={formData.password} onChange={handleChange} name="password" type="password" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Password" />
              <label htmlFor="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
            </div>
            <div className="relative">
              <button type="submit" className="bg-cyan-500 text-white rounded-md px-2 py-1">{isLoading ? 'Processing...' : 'Submit'}</button>
            </div>
          </div>
        </div>
      </div>
    </form>

      <div className="w-full flex justify-center">
        
        <a className="text-indigo-700 hover:text-pink-700 text-sm float-right" href="/register">Create Account</a> */}
        {/* <a className="text-indigo-700 hover:text-pink-700 text-sm float-left" href="#">Forgot Password?</a><br></br> */}

      {/* </div>

    </div>
  </div>
</div> */}
    </>
   
    
  );
}
