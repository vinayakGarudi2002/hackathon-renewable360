// This module is used to handle user authentication

var jwt = require("jsonwebtoken");
const JWT_SEC = "vinaya$k"; // Secret key for generating and verifying JWT tokens

// Middleware function to fetch the user from the JWT token
const fetchUser = (req, res, next) => {
// Get the token from the request header
const token = req.header("auth-token");
// If no token is found, return a response with an error message
if (!token) {
res.status(401).send({ error: "Please authenticate using a valid token" });
// 401 status code indicates unauthorized access
}
// If a token is found, try to verify it
try {
// Decode the token to get the user data
const data = jwt.verify(token, JWT_SEC);
// Add the user data to the request object
req.user = data.user;
// Call the next middleware function

// console.log("Middleware executed")
next();
} catch (error) {
// If the token is invalid, return a response with an error message
res.status(401).send({ error: "Please authenticate using a valid token" });
// 401 status code indicates unauthorized access
}
};

module.exports = fetchUser;