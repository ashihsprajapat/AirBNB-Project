const passport = require("passport");
const User = require("../models/user.js");
//rend sign up form
module.exports.renderSingupForm=(req, res) => {
    res.render("./user/signup.ejs");
};
//signup
module.exports.singup=async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registerUser = await User.register(newUser, password);
        //console.log(registerUser);
        req.login(registerUser,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success", "singup Success Full");
        res.redirect("/listing");
        })
        
    } catch (err) {
        req.flash("error", "Sorry username Already Exist");
        res.redirect("/signup");
    }
};
//login
module.exports.login=async (req, res) => {
    let { username, password } = req.body;
    const newUser = new User()
    req.flash("success","WELLCOME Back to my website!");
    let redirectUrl=res.locals.redirectUrl||"/listing"
    res.redirect(redirectUrl);
};
//login from render
module.exports.renderLoginForm=(req, res) => {
    res.render("./user/login.ejs");
};
//logout
module.exports.logout=(req,res)=>{
    req.logOut((err)=>{
        if(err){
            return next(err);
        }
    })
    req.flash("success","You are logout ");
    res.redirect("/listing");
};