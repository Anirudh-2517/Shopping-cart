import axios from 'axios'
import React, { useRef } from 'react'
import '../mystyles/index.css'

function Addcustomer() {
    const cid=useRef("")
    const cname=useRef("")
    const cellno=useRef("")

    const insertcustomer=()=>
    {
        let cid1=cid.current.value
        let cname1=cname.current.value
        let cellno1=cellno.current.value

        const payload=
        {
            cid:cid1,
            cname:cname1,
            cellno:cellno1
        }
        axios.post("http://localhost:9015/api/Customers/insertcustomers",payload)
        .then(response=>{
            alert(response.data)
        })
        .catch(error=>{
            console.log(error)
        })
    }
  return (
    <div className='box'>
        <h1 style={{fontFamily:'cursive'}}>Add Customer</h1>
        <input className='form-control w-75 m-3' type='text' placeholder='Enter cid' ref={cid}></input>
        <input className='form-control w-75 m-3' type='text' placeholder='Enter cname' ref={cname}></input>
        <input className='form-control w-75 m-3' type='text' placeholder='Enter cell no.' ref={cellno}></input>
        <button className='btn btn-dark m-3' onClick={insertcustomer}>Insert Customer</button>
    </div>
  )
}

export default Addcustomer