const mongoose = require("mongoose");
// const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  name: { type: String },
  email: { type: String, required: true },
  brandName: { type: String },
  message: { type: String, required: true },
});

// messageSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Message", messageSchema);
