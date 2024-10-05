const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db=require('./dbconnect')
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
