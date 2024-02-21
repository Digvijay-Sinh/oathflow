
import React, { useState } from 'react'
// import register from "../assets/register.avif"
// import bg from "../assets/hero-bg.png"
// import { toast } from 'react-toastify';
// import {  useNavigate } from 'react-router-dom';

import axios from '../api/axios'
import { useAuth } from '../context/AuthProvider'; // Importing the useAuth hook

// export type AuthData = {
//     email: string;
//     password: string;
//     accessToken: string;
//     // Add more properties as needed
//   };


 
const Login : React.FC = () => {
 
  const [email , setEmail] = useState("");
  const [password , setPassword] = useState("");
//   const navigate = useNavigate();
//   const location = useLocation();
//   const from =  "/";
  const { auth, setAuth } = useAuth(); // Destructure the auth and setAuth from the useAuth hook

//   const [password , setPassword] = useState("");
//   const [mobile_no , setMoblieNo] = useState("");
 

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    try {
        const res = await axios.post('/api/v1/auth/login',
            JSON.stringify({ email, password }),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        );
        const accessToken = res?.data?.accessToken;
        setAuth({ email, password, accessToken });
        console.log(auth);
        
        console.log(JSON.stringify(res?.data));       
        setEmail('')
        setPassword('')
        // history.push('/'); // Change '/dashboard' to the desired route

    } catch (error) {
        console.log(error);
    }
  }
 
 
 
  return (
    <>
 
    <section className=" flex items-center  bg-no-repeat bg-center bg-cover py-[60px] 2xl:h-[800px]" >
      <div className="max-w-full w-[1440px] px-5 mx-auto">
        <div className="flex flex-col lg:flex-row gap-[90px] items-center justify-between">
 
          {/* ================== Hero Content ================== */}
          <div className="justify-between items-end">
            {/* <img src={register} alt="" className="w-full rounded-full" /> */}
          </div>
          {/* ================== Hero Content ================== */}
          <div className="flex gap-[30px] justify-between items-start w-full">
         <form className="w-full max-w-lg" onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}>
              
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-email">
                    Email
                  </label>
                  <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-email" type="email" placeholder="xyz@gmail.com" required />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                    Password
                  </label>
                  <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="Enter password" required />
                </div>
              </div>
             
           
              <div className="flex flex-wrap -mx-3 mb-2">
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
               
                    <button type='submit' className="mt-10 bg-primaryColor w-full h-full font-bold hover:bg-green-400 rounded-full">Sign Up</button>
                </div>
              </div>
            </form>
          
           
          </div>
 
 
        </div>
      </div>
    </section>
  </>
  )
}
 
export default Login