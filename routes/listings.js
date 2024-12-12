const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Listing = require("../models/listing.js")
const wrapAsync = require("../utilits/wrapAsync.js");
const multer = require("multer");
const { cloudinary, storage } = require("../cloudConfig.js");
const upload = multer({ storage });


const { listingSchema } = require("../schema.js");
const { isLogined, isOwner, validateListing } = require("../middleware.js")
//this for controller call back 
const {
    index,
    renderNewForm,
    showListing,
    creatListing,
    renderEditForm,
    updateListing,
    destroyListing,
} = require("../controlers/listing.js");



router.route("/")
    //index route
    .get(wrapAsync(index))
    .post(
        isLogined,
        validateListing,
        upload.single('Listing[image]'),
        wrapAsync(creatListing));

router.get("/:id/edit", isLogined, isOwner, wrapAsync(renderEditForm));

//Create New Rout
router.get("/new", isLogined, renderNewForm);

router.route("/:id")
    .get(wrapAsync(showListing))
    .put(
        isLogined,
        isOwner,
        upload.single('Listing[image]'),
        validateListing,
        wrapAsync(updateListing))
        
    .delete(
        isLogined,
        isOwner,
        wrapAsync(destroyListing))

module.exports = router;