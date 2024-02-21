
import { useEffect, useState } from 'react'
import './App.css'
import axios,{axiosPrivate} from './api/axios'
import Login  from './components/Login'
import { useAuth, AuthData } from './context/AuthProvider'
function App() {
  const {auth,setAuth}=useAuth();
  const [users, setUsers] = useState<[]>([]);
  const [showUsers, setShowUsers] = useState<boolean>(false);


  const refresh = async () => {
    const response = await axios.get('/api/v1/auth/refreshToken', {
        withCredentials: true
    });
    setAuth((prevAuth: AuthData | null) => ({
      ...prevAuth!,
      accessToken: response.data.accessToken,
      // Include other properties if needed
    }));
    return response.data.accessToken;
}
useEffect(() => {
  const requestIntercept = axiosPrivate.interceptors.request.use(
    config => {
        if (!config.headers['Authorization'] ) {
          if (auth && 'accessToken' in auth ) {
            config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
 
          }
        }
        return config;
    }, (error) => Promise.reject(error)
);

const responseIntercept = axiosPrivate.interceptors.response.use(
  response => response,
  async (error) => {
      const prevRequest = error?.config;
      if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest);
      }
      return Promise.reject(error);
  }
);

  return () => {
    axiosPrivate.interceptors.request.eject(requestIntercept);
    axiosPrivate.interceptors.response.eject(responseIntercept);
    
  }
}, [auth])
const getUsers = async () => {
  try {
    const response = await axiosPrivate.get('/api/v1/events');
    console.log(response.data);
    setUsers(response.data);
    setShowUsers(true);
  } catch (err) {
    console.error(err);
  }
};

const handleGetUsersClick = () => {
  getUsers();
};
// useEffect(() => {
//   const controller = new AbortController();

//   const getUsers = async () => {
//       try {
//           const response = await axiosPrivate.get('/api/v1/events', {
//               signal: controller.signal
//           });
//           console.log(response.data);
//            setUsers(response.data);
//            setShowUsers(true)

//       } catch (err) {
//           console.error(err);
//           // navigate('/login', { state: { from: location }, replace: true });
//       }
//   }

//   getUsers();
//   return () => {
//       controller.abort();
//   }
// }, [auth])
console.log('====================================');
console.log(auth);
console.log('====================================');
  return (
   <>
   <div>
    {auth &&
      'name' in auth && <div>
        <h2>{auth?.name as string}</h2>
      </div>
    }
   
    {
      showUsers && <article>
      <h2>Users List</h2>
      {users?.length
          ? (
              <ul>
                  {users.map((user, i) => <li key={i}>{i}</li>)}
              </ul>
          ) : <p>No users to display</p>
      }
  </article>
    }
         <Login />
<button onClick={handleGetUsersClick} >Get Users</button>
       
    

    </div></>
  )
}

export default App
