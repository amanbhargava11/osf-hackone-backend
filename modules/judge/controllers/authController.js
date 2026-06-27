const authService = require("../services/authService");

class AuthController {
  /**
   * POST /judge-api/auth/login
   */
  async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "Email and password are required.",
        });
      }

      const result = await authService.login(email, password);

      return res.status(200).json({
        success: true,
        message: "Login successful.",
        ...result,
      });

    } catch (error) {
      return res.status(401).json({
        success: false,
        message: error.message || "Login failed.",
      });
    }
  }

  /**
   * GET /judge-api/auth/profile
   */
  async profile(req, res) {
    try {
      const user = await authService.getProfile(req.user.id);

      return res.status(200).json({
        success: true,
        user,
      });

    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = new AuthController();