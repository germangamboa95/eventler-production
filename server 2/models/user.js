const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const User = new Schema({
    provider: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
    default: null
  },
  first_name: {
    type: String,
    default: null
  },
  last_name: {
    type: String,
    default: null
  },
  img_url: {
    type: String,
    required: false
  }, 
  email: {
    type: String,
    default: null
  },
  type: {
    type: String,
    required: true,
    default: 'User'
  },
  cell: {
    type: String,
    default: null
  },
  events_signed_up: [
    {
      type: Schema.Types.ObjectId,
      ref: "Event",
      default: null
    }
  ],
  events_approved: [
    {
      type: Schema.Types.ObjectId,
      ref: "Event",
      default: null
    }
  ],
  events_attended: [
    {
      type: Schema.Types.ObjectId,
      ref: "Event",
      default: null
    }
  ],
  events_owned: [
    {
      type: Schema.Types.ObjectId,
      ref: "Event",
      default: null
    }
  ]
});

module.exports = mongoose.model("User", User);
