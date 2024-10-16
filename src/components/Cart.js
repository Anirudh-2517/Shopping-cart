import React, { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'

function Cart({cartitems,setcartitems,grandtotal,setgrandtotal,counter,setcounter,customer,order_id,setOrder_id}) {
  const [message,setMessage]=useState("")

  const increment=(item)=>{
      cartitems.map(it=>it.pid==item.pid?it.qtty++:"nothing")
      setcartitems([...cartitems])
      setgrandtotal(grandtotal+item.price)
    }

  const confirmorder=async()=>{
      const to ='anirudhmore43@gmail.com'
      const subject ='order confirmation'
      
      var message1="<h5>Dear "+customer.cname+",\n Thank you for your purchase! Here are the details of your order: \n\n</h5> \n\n "
        +" <table border='1' border-collapse='collapse'><thead><th>Item ID</th><th>Item Name</th><th>Item Price</th><th>Item Qtty</th> "
        +" <th>Amount</th></thead><tbody> "+
        cartitems.map(item=>" <tr><td>"+item.pid+"</td><td>"+item.pname+"</td><td>"+item.price+"</td><td>"+
          item.qtty+"</td><td>"+item.qtty*item.price+"</td></tr> ")
        setMessage(message1)

      var newmessage=message.replace(/,/g, '')  
        newmessage=newmessage+" </tbody></table> \n your order amount ="+grandtotal
        +" \n<p>If you have any questions or need further assistance, please feel free to contact us.\n Best regards,\n [Ammijaan.ltd]. </p>"

      const payload = 
      {
        to:to,
        subject:subject,
        message:newmessage
      }
      
      const payload1=
      {
        order_id:1004,
        order_amt:grandtotal,
        order_date:new Date().toISOString(),
        cid:customer.cid
      }

      // const orderitems=cartitems.map(item=>item.order_id=1004)
      const updatedItems =cartitems.map(item => {
        return {
          ...item, // Spread the existing properties
          order_id: order_id // Add the new key-value pair
        };
      });
      const payload2=
      {
        allitems:updatedItems
      }
      
      await axios.post("http://localhost:9015/api/insertorderdetails",payload2)
      .then(response=>{
        
        alert(response.data)
        setOrder_id(order_id+1)
      })
      .catch(error=>{
        console.log(error)
      })

      axios.post("http://localhost:9015/api/Order/placeorder",payload1)
      .then(response=>{
        alert(response.data)
      })
      .catch(error=>{
        console.log(error)
      })

      axios.post("http://localhost:9015/api/Email/sendemail",payload)
        .then(response=>{
            alert(response.data)
        })
        .catch(error=>{
            console.log(error)
        })
        setcartitems([])
        setcounter(0)
  }

  const decrement=(item)=>{
      if(item.qtty>0){
      cartitems.map(it=>it.pid==item.pid?it.qtty--:"nothing")
      setcartitems([...cartitems])
      setgrandtotal(grandtotal-item.price)}
  }

  const deleteitem=(item)=>{
      const rempro=cartitems.filter(it=>it.pid!==item.pid)
      setcartitems([...rempro])
      setcounter(counter-1)
      if(item.qtty!==0)
        setgrandtotal(grandtotal-item.price)
  }
  useEffect(()=>{},[cartitems])

  return (
    <div>
      {order_id}
        <h1 style={{fontFamily:'cursive', textAlign:'center'}}><b>Cart</b></h1><ul style={{listStyle:'none'}} className='list-group'>
        {cartitems.map(item=><li className='list-group-item m-1'>
          <span style={{display:'inline-block',width:'110px'}}>{item.pid}</span>
          <span style={{display:'inline-block',width:'110px'}}>{item.pname}</span>
          <span style={{display:'inline-block',width:'100px'}}>{item.price}*{item.qtty}={item.price*item.qtty}</span>
          <span style={{display:'inline-block',width:'140px'}}><img src={item.imageURl} width='115px' height='100px' alt='product'></img></span>
          <button className='btn btn-success m-1' onClick={()=>increment(item)}>+</button>
          <span style={{display:'inline-block',width:'100px'}}><button className='btn btn-warning m-1' onClick={()=>decrement(item)}>-</button></span>
          <button className='btn btn-danger m-1' onClick={()=>deleteitem(item)}>Delete</button>
          </li>)}
          </ul>
          <br></br>
          <h3 style={{textAlign:'center'}}>Grand total = {grandtotal}</h3>
          <button onClick={confirmorder} style={{alignContent:"end"}} className='btn btn-primary '>Confirm order</button>
    </div>
  )
}

export default Cart