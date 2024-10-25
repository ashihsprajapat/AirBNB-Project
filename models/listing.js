const mongoose=require("mongoose");
const schema=mongoose.Schema;
const  defURL="https://th.bing.com/th/id/OIP.6sAjFb-W5NRiCsEtlGS5dQAAAA?rs=1&pid=ImgDetMain";

const listingSchema= new schema({
    title:{
        type:String,
        
    },
    description:String,
    image:{
        
        type:String,
        default:defURL,
        set:(v)=>
            v===""?defURL:v,
    
    
       
    },
    price:Number,
    location:String,
    country:String
})

const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;