const router = require("express").Router();
const controllers = require("../controllers");
const passport = require('../scripts/passportConfig');


//  Routes regarding sign ups and logins
router.post("/finishSignUp/:id", controllers.user.finishSignUp);
router.get('/user/:_id', controllers.user.getUser);
router.post('/user/new', controllers.user.signUpNew);


module.exports = router; 