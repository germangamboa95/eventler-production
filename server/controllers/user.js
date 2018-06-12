const db = require("../models");
const jwt = require("jsonwebtoken");

module.exports = {
  signUp: async (req, res) => {
    const provider = req.locals.provider;
    const user_id = req.locals.id;

    const userData = req.locals._json;
    const dbData = await db.User.find({ provider: provider, id: user_id });

    console.log(dbData, "asdf");
    if (dbData.length == 1) {
      req.dbData = dbData[0];
      req.sf = true;
      module.exports.login(req, res);
    } else {
      try {
        const dbData = await db.User.create({
          provider: provider,
          id: user_id,
          first_name: userData.name.givenName,
          last_name: userData.name.familyName,
          email: userData.emails ? userData.emails[0].value : null,
          img_url: userData.image ? userData.image["url"] : null
        });

        req.dbData = dbData;
        req.sf = false;
        module.exports.login(req, res);
      } catch (error) {
        res.send(error);
      }
    }
  },

  // Fix redirect to / once deployed.
  login: async (req, res) => {
    const payload = { id: req.dbData.id };
    const tokenSigned = jwt.sign(payload, process.env.SECRET_OR_KEY);
    res.redirect(
      `https://eventler.app/?token=${tokenSigned}&done=${req.sf}&ui=${
        req.dbData._id
      }`
    );
  },
  finishSignUp: async (req, res) => {
    const user_id = req.params.id;
    const updates = req.body.data;
    console.log(updates);
    const dbData = await db.User.findByIdAndUpdate(user_id, updates, {
      new: true
    });
    res.json(dbData);
  },
  getUser: async (req, res) => {
    const _id = req.params._id;
    const dbData = await db.User.findById(_id);
    res.json(dbData);
  },
  signUpNew: async (req, res) => {
    const info = req.body;
    info.provider = 'App';
    info.id = Math.random();

    const dbData = await db.User.findOne({ email: info.email });
    console.log(dbData);
    if (dbData) {
      res.json(dbData);
    } else {
      const userAdded = await db.User.create(info);
      res.json(userAdded);
    }
  }
};
