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