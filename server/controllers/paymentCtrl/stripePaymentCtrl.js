
const userModel = require('../../models/userModels');
const patentPayBystripe =  (req,res)=>{

    try {
        console.log('yes trigger');
        res.status(201).send({
            success: true,
            message: 'yesssssss ',
          });
        
    } catch (error) {
        console.log(error);
    }

}

module.exports = {patentPayBystripe}