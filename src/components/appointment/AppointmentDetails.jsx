  	import { useState } from "react";
  	import { FaPhone, FaMapMarkerAlt, FaEdit, FaFileAlt, FaDownload } from "react-icons/fa";
  	
  	export default function AppointmentDetails() {
  	  const [activeTab, setActiveTab] = useState("Appointment Details");
  	
  	  const appointments = [
  	    { date: "5 Dec 2019", time: "4:30 PM", doctor: "Petunia Dusley", status: "Visited" },
  	    { date: "2 Dec 2019", time: "2:30 PM", doctor: "Ashley Tricton", status: "Visited" },
  	    { date: "28 Nov 2019", time: "7:00 PM", doctor: "Edward Norman", status: "Cancelled" },
  	    { date: "22 Nov 2019", time: "9:30 AM", doctor: "Petunia Dusley", status: "Visited" },
  	  ];
  	
  	  return (
  	    <div className="max-w-4xl mx-auto p-6 bg-gray-100 shadow-md rounded-lg">
  	      <div className="flex items-center gap-4 mb-4">
  	        <img src="https://via.placeholder.com/60" alt="Doctor" className="w-16 h-16 rounded-full" />
  	        <div>
  	          <h2 className="text-lg font-semibold">Dr. Messy Williams</h2>
  	          <p className="text-gray-600">36 Years</p>
  	        </div>
  	      </div>
  	
  	      <div className="flex justify-between text-sm text-gray-700 mb-4">
  	        <div className="flex items-center gap-2">
  	          <FaPhone className="text-blue-500" /> +91 8745587998
  	        </div>
  	        <div className="flex items-center gap-2">
  	          <FaMapMarkerAlt className="text-red-500" /> 32 A Prosperity Street, London
  	        </div>
  	      </div>
  	
  	      <div className="border-b border-gray-300 mb-4 flex">
  	        <button 
  	          className={`py-2 px-4 ${activeTab === "Personal Details" ? "text-blue-500 border-b-2 border-blue-500" : "text-gray-500"}`}
  	          onClick={() => setActiveTab("Personal Details")}
  	        >
  	          Personal Details
  	        </button>
  	        <button 
  	          className={`py-2 px-4 ${activeTab === "Appointment Details" ? "text-blue-500 border-b-2 border-blue-500" : "text-gray-500"}`}
  	          onClick={() => setActiveTab("Appointment Details")}
  	        >
  	          Appointment Details
  	        </button>
  	      </div>
  	      
  	      {activeTab === "Appointment Details" && (
  	        <div className="overflow-auto max-h-64 border rounded-md">
  	          <table className="w-full text-left">
  	            <thead className="bg-gray-200">
  	              <tr>
  	                <th className="p-2">DATE</th>
  	                <th className="p-2">DOCTOR DETAILS</th>
  	                <th className="p-2">STATUS</th>
  	                <th className="p-2">ATTACHMENT</th>
  	                <th className="p-2">ACTION</th>
  	              </tr>
  	            </thead>
  	            <tbody>
  	              {appointments.map((appointment, index) => (
  	                <tr key={index} className="border-t">
  	                  <td className="p-2">{appointment.date} <br /> {appointment.time}</td>
  	                  <td className="p-2">{appointment.doctor}</td>
  	                  <td className={`p-2 ${appointment.status === "Cancelled" ? "text-red-500" : "text-green-500"}`}>
  	                    {appointment.status}
  	                  </td>
  	                  <td className="p-2 text-blue-500"><FaFileAlt /></td>
  	                  <td className="p-2 flex gap-2">
  	                    <FaEdit className="text-blue-500 cursor-pointer" />
  	                    <FaDownload className="text-gray-500 cursor-pointer" />
  	                  </td>
  	                </tr>
  	              ))}
  	            </tbody>
  	          </table>
  	        </div>
  	      )}
  	
  	      {activeTab === "Personal Details" && (
  	        <div className="p-4 bg-white border rounded-md">
  	          <h3 className="text-lg font-semibold">Personal Details</h3>
  	          <p className="text-gray-700 mt-2">This section can contain personal details of the doctor or patient.</p>
  	        </div>
  	      )}
  	    </div>
  	  );
  	}
