const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utilits/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const{
    renderSingupForm,
    singup,
    login,
    renderLoginForm,
    logout,
}=require("../controlers/user.js");

router.route("/signup")
.get( renderSingupForm)//signup pade
.post( wrapAsync(singup));//post for singup


router.route("/login")
.get(renderLoginForm )//login form
.post(
    saveRedirectUrl,
    passport.authenticate("local", { failureRedirect: "/login", failureFlash: true }),//post for login 
    login )

router.route("/logout")
.get(logout);//logout

module.exports = router;