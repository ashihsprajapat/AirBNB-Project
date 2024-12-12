if (process.env.NODE_ENV != "production") {
    require("dotenv").config();
}

const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const path = require("path");
const methodOverride = require("method-override");
const ExpressError = require("./utilits/ExpressError.js");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
//for passport strategy
const passport = require("passport")
const LocalStrategy = require("passport-local");

//for user model
const User = require("./models/user.js");
const ejsMate = require("ejs-mate");
const app = express();
const port = 8080;
const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
const wrapAsync = require("./utilits/wrapAsync.js")


app.set("view engine", "ejs");
app.set("viwes", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }))
app.engine("ejs", ejsMate)
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")))


app.listen(port, () => {
    console.log("app is listeing on port,", port);
});

const dbUrl = process.env.dbURL_Atlas;
async function main() {
    await mongoose.connect(dbUrl);
}
main()
    .then(() => {
        console.log("connect to database")
    })
    .catch(err => console.log(err));

    // for connect mongo
    const store = MongoStore.create({
        mongoUrl: dbUrl,
        crypto: {
            secret: "process.env.SECRET",
        },
        touchAfter:24*60*60,
    })
    store.on("error",()=>{
        console.log("ERROR in mongo sessions")
    })

//set up for sessions
const option = {
    store,
    secret:" process.env.SECRET",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    },
    
};

app.get("/",(req,res)=>{
    res.redirect("/listing");
})


app.use(session(option));
app.use(flash());
//passport setting setup
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(passport.initialize());
app.use(passport.session());

//Middleware for flash  or locals which can acces in ejs file
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
})
const listingRouter = require("./routes/listings.js")
const rivewRouter = require("./routes/reviews.js");
const userRouter = require("./routes/user.js");
const { storage } = require("./cloudConfig.js");

app.use("/listing", listingRouter);
app.use("/listing/:id/review", rivewRouter);
app.use("/", userRouter);

app.all("/*", (req, res, next) => {
    next(new ExpressError(404, "Page not found !"));
})
app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Somthing went wrong" } = err;
    //res.status(statusCode).send(message);
    return res.status(statusCode).render("./error.ejs", { err });
})