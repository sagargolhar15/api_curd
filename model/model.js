const mongoose=require('mongoose');
const proSchema=new mongoose.Schema({
    name:{ 
        type:String,
        unique:true,
        required:true},
    city:{
        type:String,
        required:true
    },
    created_at:{ 
        type:Date,
         default: Date.now
        }
})
module.exports=mongoose.model("product",proSchema);