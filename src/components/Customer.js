import axios from 'axios'
import React, { useState } from 'react'

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
    <div>
      <h1>Customers</h1>
        {allCustomers.map(customer=>
        <li style={{listStyle:'none'}}>
          <span style={{display:'inline-block',width:'100px'}}>{customer.cid}</span>
          <span style={{display:'inline-block',width:'100px'}}>{customer.cname}</span>
          <span style={{display:'inline-block',width:'100px'}}>{customer.cellno}</span>
        </li>)}
    </div>
  )
}

export default Customer