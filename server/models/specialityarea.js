const mongoose = require("mongoose");

const SpecialityAreaSchema = new  mongoose.Schema({

   name:{
    type:string,
    required:true
   },
   status:{
    type:string,
    default:'active'
   }

},{
    timestamps:true,
})

const  SpecialityAreaModel =  mongoose.model('specialityarea',SpecialityAreaSchema);
module.exports = SpecialityAreaModel;