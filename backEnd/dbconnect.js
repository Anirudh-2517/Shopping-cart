const mongodb = require('mongodb');

const uri = 'mongodb://localhost:27017/shoppingcart';
var db="";
const myConnection=new mongodb.MongoClient(uri);

try 
{
    myConnection.connect()
    db = myConnection.db()
    console.log("Connected to MongoDb")
} 
catch (error) 
{
    console.log(error)
}

module.exports=db