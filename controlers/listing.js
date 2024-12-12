const Listing = require("../models/listing.js");

//for index route all listing show
module.exports.index = async (req, res) => {
    let allListing = await Listing.find({});
    res.render("./listing/index.ejs", { allListing });
};

//new Rout for listing
module.exports.renderNewForm = async (req, res) => {
    res.render("./listing/new.ejs");
};

//for show rout
module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id)
        .populate({
            path: "reviews",
            populate: {
                path: "author",
            },
        }).
        populate("owner");
    if (!listing) {
        req.flash("error", "Listing is not Exist");
        res.redirect("/Listings");
    }
    res.render("listing/show.ejs", { listing })
};

//create Route
module.exports.creatListing = async (req, res, next) => {
    let url = req.file.path;
    let filename = req.file.filename;
    let newListing = new Listing(req.body.Listing);
    req.flash("success", "new Listing Create!");
    newListing.owner = req.user._id;
    newListing.image = { url, filename };
    await newListing.save();
    res.redirect(`/listing/${newListing._id}`);
};

//edit rout
module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing is not exits");
        res.redirect("/listing");
    }
    req.flash("success", "You can Update !");
    let originalImageUrl=listing.image.url;
    originalImageUrl=originalImageUrl.replace("/upload","/upload/h_30,w_2506");
    res.render("./listing/edit.ejs", { listing,originalImageUrl });
};

//update Listing
module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    let updateListing = await Listing.findByIdAndUpdate(id, { ...req.body.Listing })
    
    if ( typeof req.file!=="undefined") {//check if our listing in not update the image 
        let url = req.file.path;
        let filename = req.file.filename;
        updateListing.image = { url, filename };
        await updateListing.save();
    }
    req.flash("success", "Your Listing is Updated!");
    res.redirect(`/listing/${id}`);
};

//delete Listing
module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;
    req.flash("success", " Listing Delete!");
    await Listing.findByIdAndDelete(id)
    res.redirect("/listing");

};