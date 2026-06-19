const Creator = require("../models/Creator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.getCreatorDashboard = async (req, res) => {
  try {
    const creator = await Creator.findById(req.creator.id)
      .select("-password");

    res.json({
      success: true,
      creator,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.loginCreator = async (req,res)=>{
 try{

   const { email,password } = req.body;

   const creator =
     await Creator.findOne({ email });

   if(!creator){
      return res.status(400).json({
        success:false,
        message:"Creator not found"
      });
   }

   const match =
     await bcrypt.compare(
       password,
       creator.password
     );

   if(!match){
      return res.status(400).json({
        success:false,
        message:"Invalid credentials"
      });
   }

   const token =
     jwt.sign(
       {
         id: creator._id,
         role:"creator"
       },
       process.env.JWT_SECRET,
       { expiresIn:"7d" }
     );

   res.json({
      success:true,
      token,
      creator
   });

 }catch(err){
   res.status(500).json({
      success:false,
      message:err.message
   });
 }
}

exports.getAllCreators = async (req,res)=>{
  try{
    const creators = await Creator.find()
      .select("-password");

    res.json({
      success:true,
      creators
    });
  }catch(err){
    res.status(500).json({
      success:false,
      message:err.message
    });
  }
};

exports.createCreator = async (req,res)=>{
  try{

    const {
      name,
      email,
      password,
      creatorCode
    } = req.body;

    const exists =
      await Creator.findOne({ email });

    if(exists){
      return res.status(400).json({
        success:false,
        message:"Creator already exists"
      });
    }

    const hashed =
      await bcrypt.hash(password,10);

    const creator =
      await Creator.create({
        name,
        email,
        password:hashed,
        creatorCode
      });

    res.json({
      success:true,
      creator
    });

  }catch(err){
    res.status(500).json({
      success:false,
      message:err.message
    });
  }
};

exports.deleteCreator = async (req,res)=>{
  try{

    await Creator.findByIdAndDelete(
      req.params.id
    );

    res.json({
      success:true,
      message:"Creator deleted"
    });

  }catch(err){
    res.status(500).json({
      success:false,
      message:err.message
    });
  }
};