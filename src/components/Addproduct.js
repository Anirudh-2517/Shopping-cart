import React, { useRef } from 'react'
import axios from 'axios'

function Addproduct() {
    const pid=useRef("")
    const pname=useRef("")
    const price=useRef("")
    const imageURl=useRef("")

    const insertproduct=()=>{
        let pid1=pid.current.value
        let pname1=pname.current.value
        let price1=price.current.value
        let imageURl1=imageURl.current.value

        const payload ={
            pid:pid1,
            pname:pname1,
            price:price1,
            imageURl:imageURl1
        }
        axios.post("http://localhost:9015/api/Products/insertproducts",payload)
        .then(response=>{
            alert(response.data)
        })
        .catch(error=>{
            console.log(error)
        })
    }
  return (
    <div>
        <h1 style={{fontFamily:'cursive'}}>Add Products</h1>
        <input type='text' ref={pid} placeholder='Enter pid'></input>
        <input type='text' ref={pname} placeholder='Enter pname'></input>
        <input type='text' ref={price} placeholder='Enter price'></input>
        <input type='text' ref={imageURl} placeholder='Enter image URl'></input>
        <button onClick={insertproduct}>Insert product</button>
    </div>
  )
}

export default Addproduct