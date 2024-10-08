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
import Sendemail from './components/Sendemail';
import Header from './components/Header';

function App() {
  const [cartitems,setcartitems]=useState([])
  const [loginstatus,setloginstatus]=useState(false)
  const [usertype,setusertype]=useState("customer")
  const [grandtotal,setgrandtotal]=useState(0)
  const [counter,setcounter]=useState(0)
  const [customer,setCustomer]=useState([])

  return (
    <div className="App">
      {loginstatus==(false)?<Login setCustomer={setCustomer} setloginstatus={setloginstatus} setusertype={setusertype}/>:usertype=="customer"?
      <div style={{display:'flex','flexDirection':'column'}}>
        <Header customer={customer} />
      <div style={{display:'flex','flexDirection':'row'}}>
      <Products cartitems={cartitems} setcartitems={setcartitems} grandtotal={grandtotal} setgrandtotal={setgrandtotal} counter={counter} setcounter={setcounter} />
      <Cart customer={customer} cartitems={cartitems} setcartitems={setcartitems} grandtotal={grandtotal} setgrandtotal={setgrandtotal} counter={counter} setcounter={setcounter} />
      <Counter counter={counter} setcounter={setcounter} /></div>
      </div>
      :<div>
      <Sendemail />  
      <Customer />
      <Addproduct />
      <Addcustomer /></div>
  }
    </div>
  );
}

export default App;
