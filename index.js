const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:false}))

const dotenv=require('dotenv')
dotenv.config();

require('./db.js')

// route
const userRoute=require('./routes/route')
app.use("/",userRoute)

app.listen(process.env.PORT, (err) => {
    if (err) throw err;
    else console.log(`the server run on the ${process.env.PORT}`)
})
