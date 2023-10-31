const jwt = require("jsonwebtoken");

module.exports = async(req,res,next) =>{
  try {
    const tokenWithBearer = req.headers["authorization"];
    const token = tokenWithBearer.split(" ")[1];
    console.log(token);
    jwt.verify(token, process.env.JWT_SECRET, (error, response) => {
  
      if(error){
          return res.status(200).send({
              message:'Auth Failed',
              success:false
          })
      }else{
            req.body.userId = response.id
            console.log('User id is- '+response.id);
              next();
      }
  
    })

  } catch (error) {
        console.log(error);
        res.status(401).send({
            message:'Auth failed',
            success:false
        })
  }
}