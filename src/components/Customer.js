import axios from 'axios'
import React, { useState } from 'react'
import '../mystyles/index.css'

function Customer() {

  const [allCustomers,setallCustomers]=useState([])
  axios.get("http://localhost:9015/api/Customers/getallcustomers")
  .then(response=>{
    setallCustomers(response.data)
  })
  .catch(error=>{
    console.log(error)
  })
  return (
    <div className='box'>
      <h1>Customers</h1>
        {allCustomers.map(customer=><ul  style={{listStyle:'none'}} className='list-group'>
        <li style={{listStyle:'none'}} className='list-group-item m-2'>
          <span style={{display:'inline-block',width:'100px'}}>{customer.cid}</span>
          <span style={{display:'inline-block',width:'100px'}}>{customer.cname}</span>
          <span style={{display:'inline-block',width:'100px'}}>{customer.cellno}</span>
        </li></ul>)}
    </div>
  )
}

export default Customer