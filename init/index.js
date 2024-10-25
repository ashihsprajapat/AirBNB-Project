const mongoose=require("mongoose");
const initData=require("./data.js");
const Listing=require("../models/listing.js");

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/air-bnb');
  }
  main()
  .then(()=>{
      console.log("connect to database")
  })
  .catch(err => console.log(err));

    let initDB=async()=>{
        await Listing.deleteMany();
        await Listing.insertMany(initData.data);
        console.log("data is save successfull");
    }

    initDB();