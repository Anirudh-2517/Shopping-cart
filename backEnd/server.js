const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db=require('./dbconnect')
const nodemailer = require('nodemailer');
const app = express();
const PORT = process.env.PORT || 9015;

// Middleware
app.use(cors());
app.use(bodyParser.json()); // for parsing application/json

app.get('/api/Products/getallproducts',async (req, res) => {
    const myCollection=db.collection("products")
    const result=await myCollection.find({}).toArray();
    res.send(result)
});

app.get('/api/Customers/getallcustomers',async (req, res) => {
    const myCollection=db.collection("customers")
    const result=await myCollection.find({}).toArray();
    res.send(result)
});

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
app.post('/api/Email/sendemail',(req,res)=>{
    const to=req.body.to;
    const subject=req.body.subject;
    const message=req.body.message;
    console.log(to,subject,message)
    sendmail(to,subject,message)
    res.send("messsage sent!")
})
// Sample POST endpoint
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

app.post('/api/Users/checkusers',async (req,res)=>{
    const receivedData=req.body;
    console.log(req.body.username)
    try {
        const myCollection=db.collection("customers")
        const user=await myCollection.find({username:req.body.username}).toArray();
        console.log(user[0])
        if(user){
            const result=req.body.password===user[0].password;
            console.log(user)
            res.send(user)
        }
        else{
            alert("invlaid user")
        }
    } catch (error) {
        res.send(error)
    }
})

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
