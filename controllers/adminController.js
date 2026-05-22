const sendOtpMail =
    require("../utils/sendMail");

const adminOtps =
    require("../utils/adminOtpStore");

exports.sendAdminOTP =
    async (req, res) => {

        try {

            const { email } =
                req.body;

            const otp =
                Math.floor(
                    100000 +
                    Math.random() * 900000
                ).toString();

            adminOtps[email] = {
                otp,
                expires:
                    Date.now() +
                    5 * 60 * 1000,
            };

            await sendOtpMail(
                email,
                otp,
                "admin-login"
            );

            res.json({
                success: true,
                message:
                    "OTP sent successfully",
            });

        } catch (error) {

            console.log(error);

            res.status(500).json({
                success: false,
                message:
                    "Failed to send OTP",
            });

        }

    };

exports.verifyAdminOTP =
    async (req, res) => {

        try {

            const {
                email,
                otp
            } = req.body;

            const stored =
                adminOtps[email];

            if (!stored) {

                return res.status(400).json({
                    success: false,
                    message:
                        "OTP not found",
                });

            }

            if (
                Date.now() >
                stored.expires
            ) {

                delete adminOtps[email];

                return res.status(400).json({
                    success: false,
                    message:
                        "OTP expired",
                });

            }

            if (
                stored.otp !== otp
            ) {

                return res.status(401).json({
                    success: false,
                    message:
                        "Invalid OTP",
                });

            }

            delete adminOtps[email];

            res.json({
                success: true,
                message:
                    "OTP verified",
            });

        } catch (error) {

            console.log(error);

            res.status(500).json({
                success: false,
            });

        }

    };