const mongoose = require("mongoose");
// const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const emaillistSchema = new Schema({
  name: { type: String },
  email: { type: String, required: true },
  brandName: { type: String },
});

// emaillistSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Emaillist", emaillistSchema);
