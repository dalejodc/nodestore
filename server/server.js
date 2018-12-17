const express = require('express')
const app = express()
 
app.get('/', (req, res)=> {
  res.json('Hello World')
})
 
app.listen(3000, ()=>{
    console.log("Runnign in the port 3000");
})