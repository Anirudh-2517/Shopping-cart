import React, { useRef, useState } from 'react'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../../node_modules/bootstrap-icons/font/bootstrap-icons.css'
import '../mystyles/index.css'


function Login({setloginstatus,setusertype}) {
    const username=useRef("")
    const password=useRef("")

    const authenticate=()=>{
        let username1=username.current.value
        let password1=password.current.value

        if(username1==="abc" && password1==="abc"){
            setloginstatus(true)
            alert("Welcome user!!!")
        }
        else if(username1==="admin" && password1==="admin"){
            setloginstatus(true)
            setusertype("admin")
            }
        else
            alert("invalid user!!!")
    }
  return (
    <div className='box'>
        <h1 style={{fontFamily:'cursive'}}>Login</h1>
        <input type='text' className='form-control w-75 m-3' placeholder='Enter your username' ref={username} ></input>
        <input type='password' className='form-control w-75 m-3' placeholder='Enter your password' ref={password} ></input>
        <button className='btn btn-dark m-3' onClick={authenticate}>Login</button>
    </div>
  )
}

export default Login