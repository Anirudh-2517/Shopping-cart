import './App.css';
import { useState } from 'react';
import { Routes,Route,Link } from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom';
import Products from './components/Products';
import Cart from './components/Cart';
import Login from './components/Login';
import Counter from './components/Counter';
import Header from './components/Header';
import Admin from './components/Admin';

function App() {
  
  const [cartitems,setcartitems]=useState([])
  const [loginstatus,setloginstatus]=useState(false)
  const [usertype,setusertype]=useState("customer")
  const [grandtotal,setgrandtotal]=useState(0)
  const [counter,setcounter]=useState(0)
  const [customer,setCustomer]=useState([])
  const [order_id,setOrder_id]=useState(1007)

  return (
    <div className="App">
      {loginstatus==(false)
      ?<Login customer={customer} setCustomer={setCustomer} setloginstatus={setloginstatus} setusertype={setusertype}/>:usertype=="customer"?
      <div style={{display:'flex','flexDirection':'column'}}>
        <Header customer={customer} />
        <div style={{display:'flex','flexDirection':'row'}}>
          <Products cartitems={cartitems} setcartitems={setcartitems} grandtotal={grandtotal} setgrandtotal={setgrandtotal} counter={counter} setcounter={setcounter} />
          <Cart order_id={order_id} setOrder_id={setOrder_id} customer={customer} cartitems={cartitems} setcartitems={setcartitems} grandtotal={grandtotal} setgrandtotal={setgrandtotal} counter={counter} setcounter={setcounter} />
          <Counter counter={counter} setcounter={setcounter} />
        </div>
      </div>:
        <div>
          <Router>
            <Admin />
          </Router>
        </div>}
    </div>
  );
}

export default App;