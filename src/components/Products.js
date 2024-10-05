import React, { useState } from 'react'
import axios, { all } from 'axios'

function Products({cartitems,setcartitems,grandtotal,setgrandtotal,counter,setcounter}) {

    const [allProducts,setallProducts]=useState([])
    axios.get("http://localhost:9015/api/Products/getallproducts")
    .then(response=>{
        setallProducts(response.data)
    })
    .catch(error=>{
        console.log(error)
    })

    const addtocart=(product)=>{
      let alreadypresent=false
      cartitems.map(it=>it.pid===product.pid?alreadypresent=true:"nothing")
      if(!alreadypresent){
        setcartitems([...cartitems,product])
        setgrandtotal(grandtotal+product.price)
        setcounter(counter+1)
      }
      else
        alert("Your item is already present in the cart")
    }
  return (
    <div>
        <h1 style={{fontFamily:'cursive'}}><b>Products</b></h1><ul style={{listStyle:'none'}} className='list-group'>
        {allProducts.map(product=>
        <li className='list-group-item m-1'>
          <span style={{display:'inline-block',width:'110px'}}>{product.pid}</span>
          <span style={{display:'inline-block',width:'110px'}}>{product.pname}</span>
          <span style={{display:'inline-block',width:'100px'}}>{product.price}</span>
          <span style={{display:'inline-block',width:'140px'}}><img src={product.imageURl} width='115px' height='100px' alt='product'></img></span>
          <button onClick={()=>addtocart(product)} className='btn btn-dark m-3'>Add to Cart</button>
        </li>)}</ul>
    </div>
  )
}

export default Products