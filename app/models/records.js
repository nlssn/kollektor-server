/* Schema for posts */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recordsSchema = new Schema({
   artist: { type: String, required: true },
   title: { type: String, required: true },
   year: { type: String, required: true },
   owned: { type: Boolean, default: false },
   score: { type: Number, default: 0 },
   image: { type: String }
});

module.exports = mongoose.model("Records", recordsSchema);