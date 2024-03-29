import { useState } from "react";
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { signup } from '../../features/registerSlice'
import Progress from "../common/Progress";


export default function Register() {
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    password: '',
    Cpassword: ''
  });
  
  const [signupRequestStatus , setSignupRequestStatus] = useState('idle');

  const dispatch = useDispatch()

  // Get the navigate function [replace the history.push() method]
  const navigate = useNavigate()

   /* 
    Get the Boolean value based on whether the form is empty or not && the post request status.
    We use the Boolean value returned to toggle the disbale status submit button
  */
    const canSubmit =[formData.name, formData.mobile,formData.password].every(Boolean) && signupRequestStatus === 'idle'

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    setIsLoading(true);
    if (canSubmit) {
      try {
        setSignupRequestStatus('pending');
          await dispatch(signup(formData)).unwrap();
          setFormData({
            name: '',
            mobile: '',
            email: '',
            password: '',
            cpassword: ''
          });
        navigate('/');
      } catch (err) {
        console.error('Unable to create post:', err);
      } finally {
        setSignupRequestStatus('idle');
        setIsLoading(false); // Reset loading state
        setLoading(false)
      }
    }
    console.log(formData);
  };
    return (
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
    <div className="relative py-3 sm:max-w-xl sm:mx-auto">
      <div
        className="absolute inset-0 bg-gradient-to-r from-orange-400 to-amber-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
      </div>
      <div className="relative px-1 py-1 bg-white shadow-lg sm:rounded-3xl sm:p-12">
  
        <div className="max-w-md mx-auto">
          <div>
            <h1 className="text-2xl font-semibold">Register</h1>
          </div>
          {loading && <Progress />}
          
          <form onSubmit={handleSubmit}>
          <div className="divide-y divide-gray-200">
            <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
            <div className="relative">
                <input autoComplete="off"  value={formData.name} onChange={handleChange} id="name" name="name" type="text" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Name" />
                <label htmlFor="email" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Name</label>
              </div>
              <div className="relative">
                <input autoComplete="off"  value={formData.mobile} onChange={handleChange} id="mobile" name="mobile" type="number" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Password" />
                <label htmlFor="mobile" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Mobile</label>
              </div>
              <div className="relative">
                <input autoComplete="off"  value={formData.email} onChange={handleChange} id="email" name="email" type="text" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Email address" />
                <label htmlFor="email" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Email Address</label>
              </div>
              <div className="relative">
                <input autoComplete="off"  value={formData.password} onChange={handleChange} id="password" name="password" type="password" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Password" />
                <label htmlFor="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
              </div>
              <div className="relative">
                <input autoComplete="off"  value={formData.cpassword} onChange={handleChange} id="Cpassword" name="Cpassword" type="password" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Password" />
                <label htmlFor="Cpassword" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Confirm Password</label>
              </div>
              <div className="relative">
                <button type="submit" disabled={!canSubmit} className="bg-cyan-500 text-white rounded-md px-2 py-1">
                {isLoading ? 'Processing...' : 'Submit'}</button>
              </div>
            </div>
          </div>
          </form>
        </div>
  
        <div className="w-full flex justify-center">
          
          {/* <a className="text-indigo-700 hover:text-pink-700 text-sm float-right" href="/udashboard">Dashboard</a> */}
          {/* <a className="text-indigo-700 hover:text-pink-700 text-sm float-left" href="#">Forgot Password?</a><br></br> */}
  
        </div>
  
      </div>
    </div>
  </div>
      
    );
  }
  