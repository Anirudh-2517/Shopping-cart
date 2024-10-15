import React, { useState } from 'react'
import axios from 'axios'
import '../mystyles/index.css'
import { format } from 'date-fns';

function Orders() {

  const [order,setOrder]=useState([])

  axios.get("http://localhost:9015/api/Orders/getallorders")
  .then(response=>{
    setOrder(response.data)
  })
  .catch(error=>{
    console.log(error)
  })

  function formatDateX(d1){
    var d=new Date(d1) 
    var date = d.getDate();
    var month = d.getMonth() + 1; // Since getMonth() returns month from 0-11 not 1-12
    var year = d.getFullYear();
    var newDate = date + "/" + month + "/" + year;
    return newDate
  }

  const MyComponent = () => {
    const date = new Date();
    const formattedDate = format(date, 'MM/dd/yyyy')};
  
  return (
    <div className='box'>
        <h1>Orders</h1>
        {order.map(order=><ul  style={{listStyle:'none'}} className='list-group'>
        <li style={{listStyle:'none'}} className='list-group-item m-2'>
          <span style={{display:'inline-block',width:'100px'}}>{order.order_id}</span>
          <span style={{display:'inline-block',width:'150px'}}>{formatDateX(order.order_date)}</span>
          <span style={{display:'inline-block',width:'100px'}}>{order.order_amt}</span>
          <span style={{display:'inline-block',width:'100px'}}>{order.cid}</span>
        </li></ul>)}
        
    </div>
  )
}

export default Orders