/**
 * Role Based Access Control (RBAC)
 *
 * Example:
 *
 * router.post(
 *   "/create-judge",
 *   authMiddleware,
 *   roleMiddleware("Admin"),
 *   controller.createJudge
 * );
 *
 * router.get(
 *   "/dashboard",
 *   authMiddleware,
 *   roleMiddleware("Admin", "Judge"),
 *   controller.dashboard
 * );
 */

const roleMiddleware = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized.",
        });
      }

      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message: "Access denied.",
        });
      }

      next();
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Role verification failed.",
      });
    }
  };
};

module.exports = roleMiddleware;