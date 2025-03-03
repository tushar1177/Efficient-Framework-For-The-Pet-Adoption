import React , {useState ,  useEffect } from 'react'
import  {NavLink , useNavigate} from "react-router-dom"
import Cookies from 'js-cookie'
import axios from "axios";
import toast from 'react-hot-toast';
function Header() {
  
  const navigate = useNavigate()
  const [logged, setLogged] = useState(false)


  console.log("logged: ", logged)
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const response = await axios.get('http://localhost:8080/user/dashboard', {
          withCredentials: true,
        });

        if (response.data.authenticated) {
          setLogged(true);
        } else {
          setLogged(false);
        }
      } catch (error) {
        setLogged(false); 
      }
    }
    checkLogin();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8080/user/logout',
        {},
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setLogged(false);
        toast.success('Successfully logged out');
        navigate('/'); // Navigate to login page after logout
      } else {
        toast.error('Logout failed');
      }
    } catch (error) {
      console.log(error);
      toast.error('An error occurred while logging out');
    }
  };

  
  // const token = Cookies.get('token')

  // useEffect(() => {
    
      
  //   const checklogin = () => {
      
  //     if(token){
  //       setLogged(true)
  //     }
  //     console.log("token: ",token);
  //   };
  //   checklogin(); 
  // }, [token]);
  
  // const handleLogout = () => {
  //   Cookies.remove('token')
  //   setLogged(false)
  // };
  return (
    <div>
        <div className='flex w-full bg-[#f2f2f2]  z-20 px-14 py-4 text-2xl justify-between fixed'>
        <div className='flex font-Mont '>
        <svg
  height="40px"
  width="40px"
  version="1.1"
  id="Capa_1"
  xmlns="http://www.w3.org/2000/svg"
  xmlnsXlink="http://www.w3.org/1999/xlink"
  viewBox="0 0 48.839 48.839"
  xmlSpace="preserve"
>
  <g>
    <path
      className="fill:#030104;"
      d="M39.041,36.843c2.054,3.234,3.022,4.951,3.022,6.742c0,3.537-2.627,5.252-6.166,5.252
      c-1.56,0-2.567-0.002-5.112-1.326c0,0-1.649-1.509-5.508-1.354c-3.895-0.154-5.545,1.373-5.545,1.373
      c-2.545,1.323-3.516,1.309-5.074,1.309c-3.539,0-6.168-1.713-6.168-5.252c0-1.791,0.971-3.506,3.024-6.742
      c0,0,3.881-6.445,7.244-9.477c2.43-2.188,5.973-2.18,5.973-2.18h1.093v-0.001c0,0,3.698-0.009,5.976,2.181
      C35.059,30.51,39.041,36.844,39.041,36.843z M16.631,20.878c3.7,0,6.699-4.674,6.699-10.439S20.331,0,16.631,0
      S9.932,4.674,9.932,10.439S12.931,20.878,16.631,20.878z M10.211,30.988c2.727-1.259,3.349-5.723,1.388-9.971
      s-5.761-6.672-8.488-5.414s-3.348,5.723-1.388,9.971C3.684,29.822,7.484,32.245,10.211,30.988z M32.206,20.878
      c3.7,0,6.7-4.674,6.7-10.439S35.906,0,32.206,0s-6.699,4.674-6.699,10.439C25.507,16.204,28.506,20.878,32.206,20.878z
      M45.727,15.602c-2.728-1.259-6.527,1.165-8.488,5.414s-1.339,8.713,1.389,9.972c2.728,1.258,6.527-1.166,8.488-5.414
      S48.455,16.861,45.727,15.602z"
    />
  </g>
        </svg>

    <h1 className='pl-4 pt-1 font-semibold'>PetPaws</h1>
        </div>
        <ul className='flex space-x-14'>
            <li>
              <NavLink to="/"  
              className={({isActive}) =>` ${isActive ? "text-yellow-600" : "text-black "} font-Lato  text-[20px] `}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about"  
              className={({isActive}) =>` ${isActive ? "text-yellow-600" : "text-black "} font-Lato  text-[20px] `}>
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/allpets"  
              className={({isActive}) =>` ${isActive ? "text-yellow-600" : "text-black "} font-Lato  text-[20px] `}>
                Find a pet
              </NavLink>
            </li>
            {/* <li>
              <NavLink to="/help"  
              className={({isActive}) =>` ${isActive ? "text-yellow-600" : "text-black "} font-Lato  text-[20px] `}>
                How it works
              </NavLink>
            </li> */}
            {/* <li>
              <NavLink to="/shelter"  
              className={({isActive}) =>` ${isActive ? "text-yellow-600" : "text-black "} font-Lato  text-[20px] `}>
              Shelter
              </NavLink>
            </li>   */}
            {logged
            ?
            (<li>
              <NavLink to="/dashboard"  
              className={({isActive}) =>` ${isActive ? "text-yellow-600" : "text-black "} font-Lato  text-[20px] `}>
              Dashboard
              </NavLink>
            </li> 
            ):
            (<>
            </>)}
        </ul>
        <ul>
            {logged
            ?
              (<li> 
                <button
                  onClick={handleLogout}
                  className="text-[20px] text-white bg-black px-6 py-1 rounded-2xl border-black hover:text-black border-2 hover:bg-white">
                  Logout
                </button>
              </li>)
            : 
              (<li><NavLink to="/login"  > 
                <button className="text-[20px] text-white bg-black px-6 py-1 rounded-2xl border-black hover:text-black border-2 hover:bg-white">
                  
                  Login 
                  
                </button></NavLink>
              </li>)
            }
        </ul>
      </div>
    </div>
)}

export default Header