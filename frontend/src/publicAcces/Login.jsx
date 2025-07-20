import React, { useState } from 'react'

const Login = () => {
    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");

    const formSubmit = (e) =>{
        e.preventDefault();

        console.log("Form Submitted");
        console.log("Email",email);
        console.log("Password:",password);

    }
  return (
    <div className=" flex items-center justify-center mt-20">

        <div className="bg-white p-8 rounded-2xl shadow-xl w-90 ">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>

        <form onSubmit={formSubmit}>
            <div className="font-semibold text-1xl pt-1">
                Email:
                <input type="email" 
                value={email}
                name='email'
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 px-4 py-2 border rounded-lg " />
            </div>

            <div className="font-semibold text-1xl pt-1">
                Password:
                <input type="password" 
                value={password}
                name='password'
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 px-4 py-2 border rounded-lg " />
            </div>

            <div className="flex items-center justify-between pt-1">
        
            </div>

            <div className="pt-1">
                <button type="submit"className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300">
                Sign In
                </button>
            </div>
        </form>

        <p className="text-sm text-center text-gray-600 mt-6">
           Don't have an account?
           <a href="#">Sign up</a>
        </p>
  </div>

</div>
  )
}

export default Login;