// Navbar.js 
import { useDispatch } from 'react-redux'; // Import for dispatching actions
import { useNavigate } from 'react-router-dom'; // Import for navigation
import { signout } from '../../features/registerSlice'; 

export default function Navbar({from}) { 
	const dispatch = useDispatch();
  const navigate = useNavigate();

  
  const handleLogout = async () => {
    try {
      await dispatch(signout()); // Dispatch the signout action
      navigate('/'); // Navigate to the login route after successful logout
    } catch (error) {
      console.error('Error during logout:', error);
      // Handle errors here (optional: display error message to user)
    }
  };
	return ( 
		<div> 
			<nav className="bg-white fixed w-full 
								z-20 top-0 left-0 
								border-b border-gray-200"> 
				<div className="flex flex-wrap items-center 
								justify-between mx-auto p-4"> 
					<a href="#"
					className="flex items-center"> 
						<img src= 
"https://cdn.logo.com/hotlink-ok/logo-social.png"
							className="mr-2"
                            width={75}
                            height={75}
							alt="Logo here" /> 
						<span className="self-center text-2xl font-semibold "> 
							Brand Name 
						</span> 
					</a> 
					<div className="items-center justify-between hidden 
									w-full md:flex md:w-auto md:order-1"
						id="navbar-sticky"> 
						<ul className="flex flex-col p-4 
									md:p-0 mt-4 font-medium 
									border border-gray-100 rounded-lg 
									bg-gray-50 md:flex-row md:space-x-8 
									md:mt-0 md:border-0 md:bg-white"> 
							 {from === 'dash' && (
        <li>
          <a href="/notification" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0">
            Notifications
          </a>
        </li>
      )}
      {from === 'noti' && (
        <li>
          <a href="/udashboard" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0">
            Dashboard
          </a>
        </li>
      )}
							<li> 
							<button onClick={handleLogout} className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0">
								Logout
							</button>
							</li> 
						</ul> 
					</div> 
				</div> 
			</nav> 
		</div> 
	) 
}
