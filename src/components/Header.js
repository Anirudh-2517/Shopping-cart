import React from 'react'

function Header({customer}) {
  return (
    <div style={{backgroundColor:'peachpuff'}}>
        <span style={{display:'inline-block', width:'200px'}}>
            <h3 style={{fontFamily:"cursive"}}>Ammijaan.ltd</h3></span> <span style={{display:'inline-block', width:'400px'}}>
            <h4>Welcome <i class="bi bi-person-circle m-1"></i> Mr.{customer.cname}</h4></span>
    </div>
  )
}

export default Header