import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import Products from './components/Products';
import Customer from './components/Customer';
import Addproduct from './components/Addproduct';
import Addcustomer from './components/Addcustomer';
import Cart from './components/Cart';
import Login from './components/Login';
import Counter from './components/Counter';

function App() {
  const [cartitems,setcartitems]=useState([])
  const [loginstatus,setloginstatus]=useState(false)
  const [usertype,setusertype]=useState("customer")
  const [grandtotal,setgrandtotal]=useState(0)
  const [counter,setcounter]=useState(0)

  return (
    <div className="App">
      {loginstatus==(false)?<Login setloginstatus={setloginstatus} setusertype={setusertype}/>:usertype=="customer"?
      <div style={{display:'flex','flexDirection':'row'}}>
      <Products cartitems={cartitems} setcartitems={setcartitems} grandtotal={grandtotal} setgrandtotal={setgrandtotal} counter={counter} setcounter={setcounter} />
      <Cart cartitems={cartitems} setcartitems={setcartitems} grandtotal={grandtotal} setgrandtotal={setgrandtotal} counter={counter} setcounter={setcounter} />
      <Counter counter={counter} setcounter={setcounter} /></div>
      :<div>
      <Customer />
      <Addproduct />
      <Addcustomer /></div>
  }
    </div>
  );
}

export default App;
