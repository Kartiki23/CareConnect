import React, { useState } from "react";

const DoctorRegistration = () =>{

  const [formData, setFormData] = useState({
    fullName:"",
    gender:"",
    age:"",
    email:"",
    phone:"",
    aadharNumber:"",
    password:"",
    specialization:"",
    hospital:"",
    licenseNumber:"",
    licensePhoto:"",
    profilePhoto:""
  });

  const handleChange = (e) =>{
    setFormData({...formData,[e.target.name]:e.target.value})
  };

  const handleSubmit = (e) =>{
    e.preventDefault();
    console.log("Doctor Registered:",formData)
  };

  return(
    <div className="flex items-center justify-center min-h-screen p-6">
        <div className="rounded-xl shadow-lg p-8 max-w-lg w-full">
          <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">Registration Form</h2>

          <form onSubmit={handleSubmit} className="space-y-4"> 
            <div>
              <label className="black font-medium mb-1">Full Name</label>
              <input type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              placeholder="Enter full name"
              />
            </div>

            <div>
              <label className="black font-medium mb-1">Gender</label>
              <div className="flex">
              <label className='flex'>
              <input
                type="radio"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              /> <p className='font-semibold ml-2'>Male</p>
            </label>
            <label className='ml-4 flex'>
              <input
                type="radio"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              /> <p className='font-semibold ml-2'>Female</p>
            </label>
            </div>
            </div>

            <div>
              <label className="black font-medium mb-1">Age</label>
              <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              placeholder="Enter age"
              />
            </div>

            <div>
              <label className="black font-medium mb-1">Contact No</label>
              <input
              type="number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              placeholder="Enter contact number"
              />
            </div>

             <div>
              <label className="black font-medium mb-1">Aadharcard Number</label>
              <input
              type="number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              placeholder="Enter contact number"
              />
            </div>

            <div>
              <label className="black font-medium mb-1">Email</label>
              <input 
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              placeholder="Enter email"
              />
            </div>

            <div>
              <label className="black font-medium mb-1">Password</label>
              <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              placeholder="Enter Password"
              />
            </div>

            <div>
              <label className="black font-medium mb-1">Specialization</label>
              <input
              type="text"
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              placeholder="e.g: Cardiologist, Neurologist"
              />
            </div>

            <div>
              <label className="black font-medium mb-1">Hospital/Clinic</label>
              <input
              type="text"
              name="hospital"
              value={formData.hospital}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              placeholder="Hospital Name"
              />
            </div>

            <div>
            <label className="block font-medium mb-1">Medical License Number</label>
            <input
              type="text"
              name="licenseNumber"
              value={formData.licenseNumber}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              placeholder="License number"
            />
          </div>

          <div>
            <label class="block font-medium">Add Medical License Photo</label>
            <input 
            type="file" 
            name="licensePhoto" 
            value={formData.licensePhoto}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label class="block font-medium">Add your Photo</label>
            <input 
            type="file" 
            name="profilePhoto" 
            value={formData.profilePhoto}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            />
          </div>


            <button
            type="submit"
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 rounded-lg transition duration-300"
          >
            Register
          </button>


          </form>
        </div>

    </div>
  )
}

export default DoctorRegistration;