import React from 'react'
import { useNavigate } from 'react-router-dom'

const Deshboard = () => {
    let navigation=useNavigate()
    let handellogout=()=>{
localStorage.removeItem("token")
console.log("logout sacassefull");
navigation("/login")

    }
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <button onClick={()=>handellogout()} className="bg-primary text-white px-4 py-2 rounded-md mt-4">Logout</button>
    </div>
  )
}

export default Deshboard