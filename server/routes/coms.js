const router = require("express").Router();
const controllers = require("../controllers");
const passport = require('../scripts/passportConfig');


//  Routes regarding sign ups and logins
router.post('/email/send', controllers.communications.sendEmail);
router.post('/email/send/confirm/signup', controllers.communications.sendConfirm);
module.exports = router; 