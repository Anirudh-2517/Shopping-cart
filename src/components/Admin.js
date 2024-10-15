import React from 'react'
import { Routes,Route,Link } from 'react-router-dom'
import Addcustomer from './Addcustomer'
import Addproduct from './Addproduct'
import Sendemail from './Sendemail'
import Orders from './Orders'
import Customer from './Customer'

function Admin() {
  return (
    <div>
      <nav>
            <ul style={{listStyle:'none',display:'flex',flexDirection:'row',gap:'20px'}}>
                <li><Link to="/Addproduct">Addproduct</Link></li>
                <li><Link to="/Addcustomer">Addcustomer</Link></li>
                <li><Link to="/Sendemail">Sendemail</Link></li>
                <li><Link to="/Orders">Orders</Link></li>
                <li><Link to="/Customer">Customer</Link></li>
            </ul>
        </nav>



        <Routes>
            <Route path='/Addproduct' element={<Addproduct />}></Route>
            <Route path='/Addcustomer' element={<Addcustomer />}></Route>
            <Route path='/Sendemail' element={<Sendemail />}></Route>
            <Route path='/Orders' element={<Orders />}></Route>
            <Route path='/Customer' element={<Customer />}></Route>
        </Routes>
    </div>
  )
}

export default Admin