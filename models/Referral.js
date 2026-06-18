const mongoose =
    require("mongoose");

const referralSchema =
    new mongoose.Schema(
        {
            referrerId: {
                type:
                    mongoose.Schema.Types.ObjectId,
                ref: "User",
            },

            referredUserId: {
                type:
                    mongoose.Schema.Types.ObjectId,
                ref: "User",
            },

            teamName: {
                type: String,
                default: "",
            },

            leaderName: String,

            status: {
                type: String,
                enum: [
                    "Pending Payment",
                    "Successful",
                ],
                default:
                    "Pending Payment",
            },
        },
        {
            timestamps: true,
        }
    );

module.exports =
    mongoose.model(
        "Referral",
        referralSchema
    );