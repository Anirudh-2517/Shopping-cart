import React, { useRef, useState } from 'react'
import axios from 'axios'
import '../mystyles/index.css'
import { format } from 'date-fns';

function Orders() {

  const [orders,setOrder]=useState([])
  const [orderitems,setOrderitems]=useState([])
  const [temporderitems,setTemporderitems]=useState([])
  const [tempcustomersdet,setCustomersdet]=useState([])
  const orderscid=useRef("")
  axios.get("http://localhost:9015/api/Orders/getallorders")
  .then(response=>{
    setOrder(response.data)
  })
  .catch(error=>{
    console.log(error)
  })
  const updateorders=async(order)=>{
    const orderid=order.order_id
    const payload3={
      order_id:orderid
    }
    await axios.post("http://localhost:9015/api/updateorderstatus",payload3)
    .then(response=>{
      alert("status updated")
    })
    .catch(error=>{
      console.log(error)
    })
  }

  const displayorders=async(order)=>{
    const orderid=order.order_id
    const payload1={
      order_id:orderid
    }
    await axios.post("http://localhost:9015/api/showorderdetails",payload1)
    .then(response=>{
      console.log(response.data)
      setTemporderitems(response.data)
    })
    .catch(error=>{
      console.log(error)
    })
    axios.get("http://localhost:9015/api/displayorders")
    .then(response=>{
      setOrderitems(response.data)
    })
    .catch(error=>{
      console.log(error)
    })
  }
  const displaycustomers=async(order)=>{
    const custid=order.cid
    const payload2={
      cid:custid
    }
    await axios.post("http://localhost:9015/api/showcustomerdetails",payload2)
    .then(response=>{
      console.log(response.data)
      setCustomersdet(response.data)
    })
    .catch(error=>{
      console.log(error)
    })
    
  }
  const findorder=async()=>{
    let orderscid1=orderscid.current.value
    const payload={
      cid:orderscid1
    }
   await axios.post("http://localhost:9015/api/searchorders",payload)
      .then(response=>{
        console.log(response.data)
        setOrderitems(response.data)
      })
      .catch(error=>{
        console.log(error)
      })  
  }
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
    const formattedDate = format(date, 'MM/dd/yyyy')
  };
  return (
    <div style={{display:'flex','flexDirection':'row'}}>
      <div className='box1'>
        <h1 style={{fontFamily:'cursive'}}>Orders</h1>
        <ul style={{listStyle:'none'}} className='list-group'>
          {orders.map(order=><li style={{listStyle:'none'}} className='list-group-item m-2'>
          <span style={{display:'inline-block',width:'90px'}}>{order.order_id}</span>
          <span style={{display:'inline-block',width:'135px'}}>{formatDateX(order.order_date)}</span>
          <span style={{display:'inline-block',width:'90px'}}>{order.order_amt}</span>
          <span style={{display:'inline-block',width:'90px'}}>{order.cid}</span>
          <span style={{display:'inline-block',width:'90px'}}>{order.order_status}</span>
          <span style={{display:'inline-block',width:'90px'}}><button onClick={()=>displayorders(order)} className='btn btn-dark'>Details</button></span>
          <span style={{display:'inline-block',width:'110px'}}><button onClick={()=>displaycustomers(order)} className='btn btn-dark'>Customers</button></span>
          <span style={{display:'inline-block',width:'90px'}}><button onClick={()=>updateorders(order)} className='btn btn-dark'>Change Status</button></span>
          </li>
          )}
        </ul>
      </div>
      <div className='box1'>
      <h1 style={{fontFamily:'cursive'}}>Order Details</h1>
      <ul style={{listStyle:'none'}} className='list-group'>
            {tempcustomersdet.map(dispcust=><li style={{listStyle:'none'}} className='list-group-item m-2'>
            <span style={{display:'inline-block',width:'110px'}}>{dispcust.cid}</span>
            <span style={{display:'inline-block',width:'110px'}}>{dispcust.cname}</span>
            <span style={{display:'inline-block',width:'100px'}}>{dispcust.cellno}</span>
            </li>
            )}
          </ul>
          <ul  style={{listStyle:'none',backgroundColor:'peachpuff'}} className='list-group'>
            {temporderitems.map(dispord=><li style={{listStyle:'none'}} className='list-group-item m-2'>
            <span style={{display:'inline-block',width:'110px'}}>{dispord.pid}</span>
            <span style={{display:'inline-block',width:'110px'}}>{dispord.pname}</span>
            <span style={{display:'inline-block',width:'100px'}}>{dispord.price}</span>
            <span style={{display:'inline-block',width:'110px'}}>{dispord.qtty}</span>
            </li>
            )}
          </ul>
          
      </div>
    </div>
  )
}

export default Orders