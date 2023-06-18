// import React from 'react 
import {useState} from "react"
import { useNavigate } from "react-router-dom";



function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


  
  const validateEmail = (email) => {
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // Perform email validation
    if (!validateEmail(email)) {
      setErrorMessage('Invalid email address');
      return;
    }

    // Make API call to authenticate the user
    try {
      const response = await fetch('https://x8ki-letl-twmt.n7.xano.io/api:XooRuQbs/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.ok) {
        // Login success
        console.log(response)
        console.log('Logged in successfully');
      //  write code for when log in successfully then it send to /forma 
        navigate('/forma');
        
      } else {
        // Login failed
        setErrorMessage('Invalid email or password');
      }
    } catch (error) {
      console.error('Error occurred during login:', error);
      setErrorMessage('An error occurred during login');
    }
  };

  const navigate = useNavigate();

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="lg:w-1/2 md:w-[70%] md:h-[70%] w-[90%] h-[80%]  lg:h-1/2 bg-white shadow-2xl flex flex-col justify-center items-center">
        <h3 className="font-[500] text-black text-3xl mt-10 ">Log in </h3>
        <div className=" w-[95%] lg:w-2/3 h-[90%] ">
          <form onSubmit={handleLogin} className="flex flex-col justify-center items-center mt-10">
            <div className="form-control w-full max-w-[400px]">
              <label className="label label-text text-lg text-black">E-mail</label>
              <input
                type="email"
                placeholder="example@email.com"
                required
                className="input input-bordered w-full bg-white text-black"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
              />
            </div>
            <div className="form-control w-full max-w-[400px] ">
              <label className="label label-text text-lg text-black">password</label>
              <input
                type="password"
                placeholder="password"
                required
                className="input input-bordered w-full bg-white text-black"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
              />
            </div>
            {/*  submit  */}
            <div className="form-control w-full max-w-xs mt-5 mb-2">
                <button className="btn btn-primary w-full bg-red-400" type="submit">Log in</button>
            </div>
            <button className="text-black hover:underline">Forget Passowrd</button>
          </form>
          {errorMessage && <p className="mt-10 text-red-500">{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
}

export default Login;
