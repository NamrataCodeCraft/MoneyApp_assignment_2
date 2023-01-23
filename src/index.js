 const express = require('express')
 const mongoose = require('mongoose')
 const port = process.env.PORT || 4000
 const route = require('./routers/route')
 const dbURL = "mongodb://localhost:27017/Assignment_2"
 const app = express()
 app.use(express.json())

 mongoose.connect(dbURL).then(()=>console.log('db is connected')).catch(()=>console.log(err))

 app.use('/', route)

app.listen(port,()=>{
    console.log(`express app is running on ${port}`)
})

