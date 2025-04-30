'use client';
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (

    <div className="container mx-auto p-4">
      <h1 className="text-3xl text-center font-bold mb-4">Welcome</h1>
      <div className="flex justify-center mt-6">
        <button
          onClick={() => router.push("/add-doctor")}
          className="bg-red-500 text-white px-6 py-3 rounded hover:bg-red-400 active:bg-red-700"
        >         
          Add Doctors
        </button>
        </div>
        <div className="flex justify-center items-center mt-4" >

     
        <button
          onClick={() => router.push("/list-doctor-with-filter")}
          className="bg-red-500 text-white px-6 py-3 rounded hover:bg-red-400 active:bg-red-700"
        >
         List Doctors
        </button>
        </div>
        </div>
  );
}

