const express = require("express");
const session = require("express-session");
const passport = require('./config/passport');
const cors = require("cors");
const app = express();
const registrationRoute = require("./routes/registration");
const verificationRoute = require("./routes/verify");
const { sendEmail }  = require('./mail/sendEmailVerificationRegistration');
const login = require("./routes/login");
const port = 5000;

app.use(express.json());

app.use(
  cors({
    // accept a request from this server
    origin: "http://localhost:3000",
    method: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.get('/', (req, res) => {
  res.send('Hello World!'); 
})
app.use("/register/submit", registrationRoute); // this is a route from the other folder the route from that folder should be '/'
app.use("/verify", verificationRoute);
app.use("/login/process", login); 
app.use(
  session({
    secret: "mysecretkey",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

app.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/" }),
  function (req, res) {
    res.redirect("/dashboard");
  }
);

app.get("/dashboard", ensureAuthenticated, function (req, res) {
  res.send("Hello, authenticated user!");
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/auth/github");
}

app.listen(port);
