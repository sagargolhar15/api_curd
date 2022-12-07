const proModel = require('../model/model');
const userModel = require('../model/User');

const bcrypt = require('bcrypt');
const crypto=require('crypto');
const saltRounds = 10;

const jwt=require('jsonwebtoken')


const postProduct = async (req, res) => {
    const data = new proModel({
        name: req.body.name,
        city: req.body.city
    })
    try {
        const dataSave = await data.save();
        res.status(200).json({ message: 'Product Added' })
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }

}

const getProduct = async (req, res) => {
    try {
        const data = await proModel.find()
        res.status(200).json(data);
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
}

const getProductById = async (req, res) => {
    try {
        const data = await proModel.findOne({ _id: req.params.id })
        res.status(200).json(data);
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
}
const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await proModel.findByIdAndDelete(id)
        res.status(200).json({ "message": "Data deleted" });
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
}

const updateProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const updateData = req.body;
        const option = { new: true }
        const data = await proModel.findByIdAndUpdate(id, updateData, option)
        res.status(200).json({ "message": "Data updated" });
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
}

const login=(req,res)=>{
    let { uname, password } = req.body;
    userModel.findOne({ username: uname }, (err, data) => {
        if (err) {
            return res.status(400).json({error:1,message:"invalid username and password"});
        }
        else if (data == null) {
            return res.status(400).json({error:1,message:"invalid username and password"});
        }
        else {
            if (bcrypt.compareSync(password, data.password)) {
               token=jwt.sign(
                {userId:data._id,username:data.username},process.env.SECRET_KEY,{expiresIn:'1h'}
               )
               return res.status(200).json({error:0,message:"Login Success",_token:token});

            }
            else {
                return res.status(400).json({error:1,message:"invalid username and password"});
            }
        }
    })

}

const saveRegister=async(req,res)=>{
    let { email,uname, password } = req.body;
    const hash = bcrypt.hashSync(password, saltRounds);
   const data=new userModel({ email:email,username: uname, password: hash,status:0 })
    
    try {
        const dataSave = await data.save();
        res.status(200).json({error:0, message: 'User Added' })
    }
    catch (err) {
        res.status(400).json({error:1, message: err.message })
    } 
}

const access=async(req,res)=>{
  const token=req.headers.authorization.split(' ')[1];
  if(!token)
  {
    res.status(200).json({ message:"Error: token was not provided" })
  }
  else{
    const decodeToken=jwt.verify(token,process.env.SECRET_KEY)
    res.status(200).json({userId:decodeToken.userId,username:decodeToken.username})
  }
}
module.exports = {
    postProduct,
    getProduct,
    getProductById,
    deleteProduct,
    updateProduct,
    login,
    saveRegister,
    access
}