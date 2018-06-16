const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Event = new Schema({
  event_name: {
    type: String,
    required: true
  },
  event_date: {
    type: Date,
    required: true
  },
  event_desc: {
    type: String,
    required: true
  },
  event_location: {
    type: String,
    required: true
  },
  event_img: {
    type: String,
    required: false
    
  },
  event_owners: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
  }],
  event_signed_up:[{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  event_attendees_approved:[{
      type: Schema.Types.ObjectId,
      ref: 'User'
  }],
  event_attendees_checkedIn:[{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  event_attendees_completed:[{
    type: Schema.Types.ObjectId,
    ref: 'User'
}]
});

module.exports = mongoose.model("Event", Event);
