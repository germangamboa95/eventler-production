const nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "germangamboa95@gmail.com",
    pass: "0599486Ger"
  }
});

module.exports = {
  sendSingle: (reciever, title, msg) => {
    const mailOptions = {
      from: "Evently",
      to: reciever,
      subject: title,
      html: `<p>${msg}</p>`
    };
    return new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          console.log("Email sent: " + info.response);
          resolve(info.response);
        }
      });
    });
  },
  sendSignUpConfirm: (email, event_name) => {
    const mailOptions = {
      from: "Evently",
      to: email,
      subject: `Welcome to ${event_name}`,
      html: `<p>This email confirms your sign up to ${event_name}</p>`
    };
    return new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          console.log("Email sent: " + info.response);
          resolve(info.response);
        }
      });
    });
  }
};
