const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/air-bnb');
}
main()
    .then(() => {
        console.log("connect to database")
    })
    .catch(err => console.log(err));

let initDB = async () => {
    await Listing.deleteMany();
    initData.data=initData.data.map((obj)=>({
        ...obj,
        owner:'674e675501d2c915e35d58e3',
    }))
    await Listing.insertMany(initData.data);
    console.log("data is save successfull");
}

initDB();