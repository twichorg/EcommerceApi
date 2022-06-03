const User = require("../models/User"); // Import User Model Schema
const { 
  verifyTokenAndAuthorization 
} = require("./verifyToken"); // Import verifyTokenAndAuthorization
const router = require("express").Router();   // Import express Router
//UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(   // Encrypt password
      req.body.password,                    // Password
      process.env.PASS_SEC    // Encrypt password with secret key
    ).toString();
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(   // Find user by id and update
      req.params.id,  // Find user by id
      {
        $set: req.body,   // Set user data
      },
      { new: true }  // Return updated user
    );
    res.status(200).json(updatedUser);  // Return user
  } catch (err) { // Catch error
    res.status(500).json(err);  // Return error
  }
});

module.exports = router;
