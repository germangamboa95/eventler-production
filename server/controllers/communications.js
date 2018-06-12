const db = require("../models");
const jwt = require("jsonwebtoken");
const nodemail = require("../scripts/nodeMailer");

module.exports = {
  sendEmail: async (req, res) => {
    const ids = req.body.recievers;
    const title = req.body.title;
    const msg = req.body.msg;
    let userData = await db.User.find({
      _id: {
        $in: ids
      }
    });
    userData = userData.map(item => item.email)
    const emailRes = await nodemail.sendSingle(userData.join(','), title, msg);
   
    res.send(emailRes);
  },
  sendConfirm: async (req, res) => {
      const _id = req.body._id; 
      const e_name = req.body.event_name
      console.log(req.body)
      const {email} = await db.User.findById(_id);
      console.log(email)
      const emailRes = await nodemail.sendSignUpConfirm(email, e_name); 
      res.json(emailRes);

  }

};
