const mongoose = require("mongoose");

const MongooseURL = process.env.Mongoose_URL;

mongoose
  .connect(MongooseURL)
  .then(() => console.log("Connected TO DB"))
  .catch((err) => console.error("Error Connecting to DB", err));

const TODOSchema = mongoose.Schema({
  task: String,
  createdAt: {
    type: Date,
    default: Date.now, // Automatically sets to current date/time when document is created
  },
  Status: {
    type: String,
    enum: ['active', 'completed'], 
    default: 'active' // Default status for new tasks
  },
});

const todo = mongoose.model("todo", TODOSchema);

module.exports = { todo };
