const Review = require("../models/review.js");
const Listing = require("../models/listing.js")

//for create revies
module.exports.createReview=async (req, res) => {
    let { id } = req.params;
    req.flash("success", "Review is Created!");
    let listing = await Listing.findById(id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    //console.log(newReview);
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    res.redirect(`/listing/${id}`);
};

module.exports.destroyReview=async (req, res) => {
    let { id, reviewId } = req.params;
    req.flash("success", "Review is Deleted!");
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/listing/${id}`);
};