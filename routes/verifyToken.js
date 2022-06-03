const jwt = require("jsonwebtoken");  // Import jsonwebtoken
const verifyToken = (req, res, next) => { // Verify token
  const authHeader = req.headers.token; // Get token from header
  if (authHeader) { // If token exists
    const token = authHeader.split(" ")[1]; // Get token from header
    jwt.verify(token, process.env.JWT_SEC, (err, user) => { // Verify token
      if (err) res.status(403).json("Token is not valid!"); // Return error
      req.user = user;  // Set user
      next(); // Call next middleware
    });
  } else {
    return res.status(401).json("You are not authenticated!");  // Return error
  }
};

const verifyTokenAndAuthorization = (req, res, next) => { // Verify token and authorization
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {  // If user id is equal to id from url or user is admin
      next(); // Call next middleware
    } else {
      res.status(403).json("You are not allowed to do that!"); // Return error
    }
  });
};

module.exports = {
  verifyToken,  // Export verifyToken 
  verifyTokenAndAuthorization,    // Export verifyTokenAndAuthorization
};
