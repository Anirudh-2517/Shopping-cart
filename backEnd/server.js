const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db=require('./dbconnect')
const nodemailer = require('nodemailer');
const app = express();
const PORT = process.env.PORT || 9015;

app.use(cors());
app.use(bodyParser.json()); // for parsing application/json

//--------------GETTING ALL PRODUCTS--------------------
app.get('/api/Products/getallproducts',async (req, res) => {
    const myCollection=db.collection("products")
    const result=await myCollection.find({}, { projection: { _id: 0 } }).toArray();
    console.log(result)
    res.send(result)

});

// -------------GETTING ALL ORDERITEMS------------------
app.get('/api/displayorders',async (req, res) => {
    const myCollection=db.collection("orderdetails")
    const result=await myCollection.find({}).toArray();
    res.send(result)
});

//--------------GETTING ALL CUSTOMERS---------------------- 

app.get('/api/Customers/getallcustomers',async (req, res) => {
    const myCollection=db.collection("customers")
    const result=await myCollection.find({}).toArray();
    res.send(result)
});

//--------------GETTING ALL ORDERS-----------------------
app.get('/api/Orders/getallorders',async (req, res) => {
    const myCollection=db.collection("orders")
    const result=await myCollection.find({}).toArray();
    res.send(result)
});

// ------------GETTING NEW ORDER_IDS------------------
app.get("/api/orderid",async (req,res)=>{
    const myCollection=db.collection("counters")
    const result=await myCollection.find({}).toArray();
    var orderidentity= result[0].order_id
    myCollection.updateOne({},{$set:{order_id:orderidentity+1}})
    res.send(result)
    
});

// ----------POST MTD OF SENDEMAIL------------------
app.post('/api/sendemail',(req,res)=>{
    const to=req.body.to;
    const subject=req.body.subject;
    const message=req.body.message;
    console.log(to,subject,message)
    sendmail(to,subject,message)
})

//-----------POST OF ORDER ITEMS ------------
app.post('/api/insertorderdetails',async (req,res)=>{
    const receivedData=req.body.allitems;
    try {
        const myCollection=db.collection("orderdetails")
        const result=await myCollection.insertMany(receivedData)
        console.log('recieved data:',receivedData);
        res.send("inserted your order items")
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

//----------POST MTD OF INSERT PRODUCTS-----------
app.post('/api/Products/insertproducts',async (req, res) => {
    const receivedData = req.body;
    try {
        const myCollection=db.collection("products")
        const result=await myCollection.insertOne(receivedData)
        console.log('Received data:', receivedData);
        res.send("inserted one product");
    }
    catch (error) {
        console.log(error)
        res.send(error)
    }
});

//-------------PLACING ORDERS--------------
app.post("/api/placeorder",async (req,res)=>{
    const receivedData =req.body;
    try {
        const myCollection=db.collection("orders")
        const result=await myCollection.insertOne(receivedData)
        console.log('Recieved data :', receivedData)
        res.send("inserted one confirmed order")
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

//-------------------SENDING EMAILS---------------------- 
async function sendmail(to,subject,message){
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com', // Replace with your email provider's SMTP server
        port: 587, // Usually 587 for TLS or 465 for SSL
        secure: false, // Set to true if using port 465
        auth: {
            user: 'anirudhmore43@gmail.com', // Your email address
            pass: 'fzxt lfbn jlaf mmob', // Your email password or app-specific password
        },
  });
// Set up email data
    const mailOptions = {
        from: '"Sender Name" <anirudhmore43@gmail.com>', // Sender address
        to: to, // List of recipients
        subject:subject, // Subject line
        html:message // Plain text body
    };
// Send the email
    await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log('Error occurred: ' + error.message);
        }
        console.log('Email sent: ' + info.response);
    });
}

//--------- POST MTD OF CHECKING USERS----------
app.post('/api/Users/checkusers',async (req,res)=>{
    const receivedData=req.body;
    try {
        const myCollection=db.collection("customers")
        const user=await myCollection.find({username:req.body.username}).toArray();
        if(user){
            const result=req.body.password===user[0].password;
            res.send(user)
        }
        else{
            alert("Invalid user!!!!")
        }
    } catch (error) {
        res.send(error)
    }
})

// ---------POST MTG OF SEARCH ORDERS-----------------
app.post('/api/searchorders',async (req,res)=>{
    const receivedData=req.body;
    const cid1=receivedData.cid
    try {
        const myCollection=db.collection("orders")
        const customer=await myCollection.find({cid:cid1}).toArray();
        if(customer){
            const result=req.body.cid===cid;
            res.send(customer)
        }
        else{
            alert("Invalid cid!!!!")
        }
    } catch (error) {
        res.send(error)
    }
})

app.post('/api/showcustomerdetails',async (req,res)=>{
    const receivedData=req.body;
    console.log(receivedData)
    const custid1=parseInt(receivedData.cid)
    console.log(custid1)
    try {
        const myCollection=db.collection("customers")
        const customerdetails=await myCollection.find({cid:custid1}).toArray();
        console.log(customerdetails)
        res.send(customerdetails)
    } catch (error) {
        res.send(error)
    }
})

app.post('/api/showorderdetails',async (req,res)=>{
    const receivedData=req.body;
    console.log(receivedData)
    const order_id1=parseInt(receivedData.order_id)
    console.log(order_id1)
    try {
        const myCollection=db.collection("orderdetails")
        const orderdetails=await myCollection.find({order_id:order_id1}).toArray();
        console.log(orderdetails)
        res.send(orderdetails)
    } catch (error) {
        res.send(error)
    }
})

app.post('/api/updateorderstatus',async (req,res)=>{
    const oid1=req.body.order_id;
    const myCollection=db.collection("orders")
    const result=await myCollection.updateOne({order_id:oid1},{$set:{order_status:"Dispatched"}})
    res.send("Status Changed")
})

//--------- POST MTD OF INSERTING CUSTOMERS ----------
app.post('/api/Customers/insertcustomers',async (req, res) => {
    const receivedData = req.body;
    try {
        const myCollection=db.collection("customers")
        const result=await myCollection.insertOne(receivedData)
        console.log('Received data:', receivedData);
        res.send("inserted one customer");
    } catch (error) {
        console.log(error)
        res.send(error)
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});