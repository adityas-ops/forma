// import React from 'react'
import { useState } from "react";
import { Link } from "react-router-dom";


function Forget() {
  const [email, setEmail] = useState('');
// const [errorMessage, setErrorMessage] = useState('');

const handleLogin = (e)=>{
  e.preventDefault();
// setErrorMessage("")
}
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
            {/*  submit  */}
            <div className="form-control w-full max-w-xs mt-5 mb-2">
                <button className="btn btn-primary w-full bg-red-400" type="submit">Reset</button>
            </div>
          </form>
          <Link className="hover:underline text-black"
          to="/">
            back
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Forget