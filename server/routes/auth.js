const router = require("express").Router();
const controllers = require("../controllers");
const passport = require("../scripts/passportConfig");


// Login with Google routes. 
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["https://www.googleapis.com/auth/userinfo.profile","https://www.googleapis.com/auth/userinfo.email"]
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  controllers.user.signUp
);


//  Login with Facebook routes
router.get(
  "/facebook",
  passport.authenticate(
    "facebook",
    { failureRedirect: "/login" },
    { public_profile: ['id', 'email', 'gender', 'link', 'locale', 'name', 'timezone', 'updated_time', 'verified'] }
  )
);

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  controllers.user.signUp
);

module.exports = router;
