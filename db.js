// connect database
const mongoose=require('mongoose')
mongoose.connect(process.env.DB_CONNECTION,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
const db=mongoose.connection;
db.on('error',(err)=>{throw err});
db.once('open',()=>{console.log("database Connected")})
