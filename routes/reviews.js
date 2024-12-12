const express = require("express");
const router = express.Router({ mergeParams: true });
const mongoose = require("mongoose");

const wrapAsync = require("../utilits/wrapAsync.js");

const { validReview,isReviewAuthor, isLogined } = require("../middleware.js")
//for controller folder file mangements
const {createReview,destroyReview}=require("../controlers/revires.js");
//DELTE review rout
router.delete("/:reviewId"
    , isLogined,
    isReviewAuthor,
    wrapAsync(destroyReview))

//POST Review reviews
router.post("/", isLogined, validReview, wrapAsync(createReview))

module.exports = router;