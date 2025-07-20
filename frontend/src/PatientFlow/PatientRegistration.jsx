import React, { useState } from 'react'

const PatientRegistration = () => {
  const [formData,setformData] = useState({
    fullName:"",
    gender:"",
    age:"",
    email:"",
    phone:"",
    password:"",
    

  });

  const handleChanges =(e) =>{

    setformData({formData,[e.target.name]: e.target.value});
  };

  const handleSubmit =(e)=>{
    e.preventdefault();
  console.log("submitted Data:",formData );  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50 p-6">
      <div className="bg-blue-100 rounded-xl shadow-lg p-8 max-w-lg w-full">
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
          patient Registration
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <lable className="block font font-medium mb-1"> Full Name</lable>
            <input
            
            type="text" 
            name="fullName"
            value={formData.fullName}
            onChange={handleChanges}
            className="w-full border rounded px-3 py-2"
            placeholder="Enter your full name"
            />
            </div>

            <div>
              <lable className="block font-medium mb-1">Gender</lable>
              <select 
              name="gender"
              value={formData.gender}
              onChange={handleChanges}
              className="w-full border rounded px-3 py-2"
              >
                <option value="">---Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="other">Other</option>

              </select>
            </div>

            <div>
              <lable className="block font-medium mb-1">Age</lable>
              <input 
              type="number" 
              name="age"
              value={formData.age}
              onChange={handleChanges}
              className="w-full border rounded px-3 py-2"
              placeholder="Enter your age"
              />
            </div>

            <div>
              <lable className="block font-medium mb-1">Email</lable>
              <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChanges}
              className="w-full border rounded px-3 py-2"
              placeholder="Enter your email"/>
              
            </div>

            <div>
              <label className="block font-medium mb-1">Phone</label>
              <input 
              type="number"
              name="phone"
              value={formData.phone} 
              onChange={handleChanges}
              className="w-full border rounded px-3 py-2"
              placeholder="10 digit phone number"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">password</label>
              <input 
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChanges}
              className="w-full border rounded px-3 py-2"
              placeholder="Create password"
               />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2
              rounded-lg transition duration-300"
              >
                Register
            </button>
        </form>
      </div>

      
    </div>
  )
}

export default PatientRegistration

