const passport = require("passport");
const passportJTW = require("passport-jwt");
const db = require("../models");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const jtwStrat = passportJTW.Strategy;
const ExtractJtw = passportJTW.ExtractJwt;

const opts = {
  jwtFromRequest: ExtractJtw.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_OR_KEY
};

const strategy = new jtwStrat(opts, (payload, next) => {
  db.User.find({
    provider_id: payload.id
  }).then(res => next(null, res));
});

passport.use(strategy);

passport.use(
  new GoogleStrategy(
    {
      clientID:
       process.env.GOOG_CLIENT,
      clientSecret: process.env.GOOG_SECRET,
      callbackURL: "https://eventler.app/api/api/auth/google/callback",
      passReqToCallback: true
    },
    function(req, accessToken, refreshToken, profile, done) {
        req.locals = profile;
        done(null, arguments);
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: "191912984965599",
      clientSecret: process.env.FB_SECRET,
      callbackURL: "https://eventler.app/api/api/auth/facebook/callback",
      passReqToCallback: true
    },
    function(req, accessToken, refreshToken, profile, done) {
      req.locals = profile;
      done(null, arguments);
    }
  )
);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});


module.exports = passport;
