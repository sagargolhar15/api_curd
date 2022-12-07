// connect database
const mongoose=require('mongoose')
mongoose.connect('mongodb+srv://sagar133:sg133155@cluster0.ugdtmj5.mongodb.net/?retryWrites=true&w=majority',{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
const db=mongoose.connection;
db.on('error',(err)=>{throw err});
db.once('open',()=>{console.log("database Connected")})
