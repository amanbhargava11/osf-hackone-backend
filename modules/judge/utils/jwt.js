const jwt = require("jsonwebtoken");

const JWT_SECRET =
  process.env.JUDGE_JWT_SECRET || "osf_judge_super_secret";

const JWT_EXPIRES =
  process.env.JUDGE_JWT_EXPIRES || "7d";

/**
 * Generate JWT Token
 */
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
    },
    JWT_SECRET,
    {
      expiresIn: JWT_EXPIRES,
    }
  );
};

/**
 * Verify JWT Token
 */
const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

module.exports = {
  generateToken,
  verifyToken,
};