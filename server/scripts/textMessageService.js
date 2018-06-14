const twilio = require("twilio");

//  Twilio setup
const accountSid = "AC464b317faef364574c54db6881e35e91";
const authToken = process.env.twilio_key;

const client = new twilio(accountSid, authToken);

// Send texts with message. Array wrapped in promise.all.
const sendTexts = async (numbersArr, msg) => {
  return Promise.all(
    numbersArr.map(async item => {
      try {
        return await client.messages.create({
          body: msg,
          to: `+1${item}`,
          from: "+13212043039" // From a valid Twilio number
        });
      } catch (error) {
        return error;
      }
    })
  );
};

// TODO:  Need to add function to keep track of messages sent later on!

module.exports = sendTexts;
