const mongoose = require("mongoose"); // Import mongoose

const UserSchema = new mongoose.Schema( // Create User Schema
  {
    username: { type: String, required: true, unique: true }, 
    email: { type: String, required: true, unique: true },  
    password: { type: String, required: true },
    isAdmin: {  
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }    // Add timestamps
);

module.exports = mongoose.model("User", UserSchema);  // Export User Model
