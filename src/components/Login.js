import React, { useRef, useState } from 'react'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../../node_modules/bootstrap-icons/font/bootstrap-icons.css'
import '../mystyles/index.css'
import axios from 'axios'

function Login({setloginstatus,setusertype,setCustomer,customer}) {
    const username=useRef("")
    const password=useRef("")
    var users=""

    const authenticate=()=>{
        let username1=username.current.value
        let password1=password.current.value
       
        const payload={
            username:username1,
            password:password1
        }
        axios.post("http://localhost:9015/api/Users/checkusers",payload)
        .then(response=>{ 
            setCustomer(response.data[0])
            users=response.data[0]
            if(username1==users.username && password1==users.password){
                 if(users.usertype==="admin"){
                     setusertype("admin")
                     setloginstatus(true)
                 }
                 else if(users.usertype==="customer"){
                     setusertype("customer")
                     setloginstatus(true)
                 }
                 else
                     alert("invalid!!!")
             }
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