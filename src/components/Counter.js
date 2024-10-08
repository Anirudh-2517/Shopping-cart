import React, { useState } from 'react'

function Counter({counter}) {
    
  return (
    <div style={{display:'flex', flexDirection:'column'}}>
        <span style={{fontSize:'18px',backgroundColor:'yellow',borderRadius:'20px', alignItems:'center',display:"flex",justifyContent:'center',marginTop:'5px'}}>{counter}</span>
        <i class="bi bi-cart-fill" style={{fontSize:'25px', color:'red'}}></i>
    </div>
  )
}

export default Counter