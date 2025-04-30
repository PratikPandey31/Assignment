'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Form() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    education: "",
    experience: "",
    city: "",
    state: "",
    country: ""
  });

  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.type === "number"
        ? parseInt(e.target.value) || 0
        : e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (e.nativeEvent.submitter?.type !== "submit") return;
  
    try {
      const response = await fetch('/api/add/route', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: { 'Content-Type': 'application/json' }
      });
  
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
  
      const data = await response.json();
  
      setSuccessMessage("Form filled successfully!");
      console.log('Success:', data);
  
      setTimeout(() => {
        setSuccessMessage('');
      }, 2000);
  
      setTimeout(() => {
        setFormData({
          name: "",
          contact: "",
          education: "",
          experience: "",
          city: "",
          state: "",
          country: ""
        });
      }, 1000);
      
    } catch (error) {
      console.error('Error:', error);
      setSuccessMessage(""); 
    }
  };
  

  return (
    <div className="max-w-md mx-auto bg-white p-5 shadow-lg rounded">
      <h2 className="text-2xl text-black font-bold mb-4">Personal Information Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {Object.keys(formData).map((field) => (
          <div key={field}>
            <label className="block text-black font-medium">
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              type={["contact", "experience"].includes(field) ? "number" : "text"}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="w-full p-2 text-black border rounded"
            />
          </div>
        ))}
        <div className="flex flex-col items-start space-y-2">
          <div className="flex flex-row space-x-2">
          <button
            type="submit"
            className="bg-red-500 text-black px-4 py-2 rounded hover:bg-red-400 active:bg-red-700"
          >
            Submit
          </button>
          <button
          onClick={() => router.push("/list-doctor-with-filter")}
          className="bg-red-500 text-black px-4 py-2 rounded hover:bg-red-400 active:bg-red-700"
        >
         List Doctors
        </button>
        </div>
          {successMessage && (
            <p className="text-green-600 font-medium">{successMessage}</p>
          )}
        </div>
      </form>
    </div>
  );
}
