const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const app = express();
const port = 8080;
const Listing = require("./models/listing.js");
const wrapAsync=require("./utilits/wrapAsync.js")



app.listen(port, () => {
    console.log("app is listeing on port,", port);
});


app.set("view engine", "ejs");
app.set("viwe", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }))
app.engine("ejs", ejsMate)
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")))


async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/air-bnb');
}
main()
    .then(() => {
        console.log("connect to database")
    })
    .catch(err => console.log(err));

app.get("/", (req, res) => {
    res.send("Hi , I am root");
})


//index route
app.get("/Listings", async (req, res) => {
    let allListing = await Listing.find({});
    res.render("./listing/index.ejs", { allListing });
})

//Create New Rout
app.get("/listing/new", async (req, res) => {
    res.render("./listing/new.ejs");
})




//show rout
app.get("/listing/:id", async (req, res) => {
    let { id } = req.params;
    let list = await Listing.findById(id);
    //res.send(`Your Id is${id}`);
    res.render("./listing/show.ejs", { list })
})

//create Rout
app.post("/listing", wrapAsync(async(req, res,next) => {
        let listing = req.body.Listing;
        let newListing = new Listing(listing);
        await newListing.save();
        //res.redirect(`/listing/${newListing._id}`);
        res.redirect("/Listings")
}));

//Edit rout
app.get("/listing/:id/edit", async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    res.render("./listing/edit.ejs", { listing });
})

//update
app.put("/listing/:id", async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.Listing })
    console.log("listing upate");
    res.redirect(`/listing/${id}`);
});

//delete rout
app.delete("/listing/:id", async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id)
    res.redirect("/Listings");
})

app.use((err, req, res, next) => {
    res.send("Something went wrong");
})