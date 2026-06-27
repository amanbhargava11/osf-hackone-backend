const JudgeUser = require("../models/JudgeUser");
const { generateToken } = require("../utils/jwt");

class AuthService {
  /**
   * Admin Login
   */
  async login(email, password) {
    // Find user
    const user = await JudgeUser.findOne({
      email: email.toLowerCase(),
      isActive: true,
    });

    if (!user) {
      throw new Error("Invalid email or password.");
    }

    // Compare password
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      throw new Error("Invalid email or password.");
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate JWT
    const token = generateToken(user);

    return {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }

  /**
   * Find user by ID
   */
  async getProfile(userId) {
    const user = await JudgeUser.findById(userId).select("-password");

    if (!user) {
      throw new Error("User not found.");
    }

    return user;
  }
}

module.exports = new AuthService();