import React, { useState } from 'react'
import { useRazorpay, RazorpayOrderOptions } from "react-razorpay";
import { useEffect } from 'react'
import axios from 'axios'

function Cart({cartitems,setcartitems,grandtotal,setgrandtotal,counter,setcounter,customer,order_id,setOrder_id}) {
  const [message,setMessage]=useState("")
  const { error, isLoading, Razorpay } = useRazorpay();
  var ordercount=0
  const confirmorder=async()=>
    {
      /*const options = {
        key: "rzp_test_8rMjUVrdO5JdaL",
        amount: 500, // Amount in paise
        currency: "INR",
        name: "JFork TS",
        description: "Test Transaction",
        order_id: "order_9A33XWu170gUtm", // Generate order_id on server
        handler: (response) => {
          console.log(response);
          alert("Payment Successful!");
        },
        prefill: {
          name: "Anirudh",
          email: "anirudhmore43@gmail.com",
          contact: "9901846049",
        },
        theme: {
          color: "#F37254",
        },
      };
  
      const razorpayInstance = new Razorpay(options);
      razorpayInstance.open();*/

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
      await axios.get("http://localhost:9015/api/orderid")
      .then(response=>{
        ordercount=response.data[0].order_id
        setOrder_id(ordercount)
        console.log(ordercount)
        alert(ordercount)
      })
      .catch(error=>{
        console.log(error)
      })
      const payload1=
      {
        order_id:ordercount++,
        order_amt:grandtotal,
        order_date:new Date().toISOString(),
        cid:customer.cid
      }

      const updatedItems =cartitems.map(item => {
        return {
          ...item, // Spread the existing properties
          order_id: ordercount // Add the new key-value pair
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

      axios.post("http://localhost:9015/api/placeorder",payload1)
      .then(response=>{
        alert(response.data)
      })
      .catch(error=>{
        console.log(error)
      })

      axios.post("http://localhost:9015/api/sendemail",payload)
        .then(response=>{
            alert(response.data)
        })
        .catch(error=>{
            console.log(error)
        })
        setcartitems([])
        setcounter(0)
    }
// --------Function increment item----------------
  const increment=(item)=>{
    cartitems.map(it=>it.pid==item.pid?it.qtty++:"nothing")
    setcartitems([...cartitems])
    setgrandtotal(grandtotal+item.price)
  }
// --------Function decrement item----------------
  const decrement=(item)=>{
      if(item.qtty>0){
      cartitems.map(it=>it.pid==item.pid?it.qtty--:"nothing")
      setcartitems([...cartitems])
      setgrandtotal(grandtotal-item.price)}
  }
// ---------Function delete item-------------------
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