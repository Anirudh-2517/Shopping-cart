import React, { useRef, useState } from 'react'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../../node_modules/bootstrap-icons/font/bootstrap-icons.css'
import '../mystyles/index.css'
import axios from 'axios'


function Login({setloginstatus,setusertype,setCustomer}) {
    const username=useRef("")
    const password=useRef("")

    const authenticate=()=>{
        let username1=username.current.value
        let password1=password.current.value

        const payload={
            username:username1,
            password:password1
        }
        axios.post("http://localhost:9015/api/Users/checkusers",payload)
        .then(response=>{
            if(response.data.length>0){
            setloginstatus(true)
            setCustomer(response.data)}
            else
                alert("no such user")
        })
        .catch(error=>{
            console.log(error)
        })

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