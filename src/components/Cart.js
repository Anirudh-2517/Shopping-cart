import React, { useState } from 'react'
import { useEffect } from 'react'

function Cart({cartitems,setcartitems,grandtotal,setgrandtotal,counter,setcounter}) {
    const increment=(item)=>{
      cartitems.map(it=>it.pid==item.pid?it.qtty++:"nothing")
      setcartitems([...cartitems])
      setgrandtotal(grandtotal+item.price)
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
        <h1 style={{fontFamily:'cursive'}}><b>Cart</b></h1><ul style={{listStyle:'none'}} className='list-group'>
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
          <h3>Grand total = {grandtotal}</h3>
    </div>
  )
}

export default Cart