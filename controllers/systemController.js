const SystemConfig =
  require("../models/SystemConfig");

/* =========================
   GET CONFIG
========================= */

exports.getConfig =
  async (req, res) => {

    try {

      let config =
        await SystemConfig.findOne();

      if (!config) {

        config =
          await SystemConfig.create({
            activePhase:
              "Registration",

            registrationOpen:
              true,

            submissionOpen:
              true,

            timerMinutes: 0,

            globalBanner: "",
          });

      }

      res.json({
        success: true,
        config,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,
        message:
          "Failed to fetch config",
      });

    }

  };

/* =========================
   UPDATE CONFIG
========================= */

exports.updateConfig =
  async (req, res) => {

    try {

      let config =
        await SystemConfig.findOne();

      if (!config) {

        config =
          await SystemConfig.create(
            req.body
          );

      } else {

        Object.assign(
          config,
          req.body
        );

        await config.save();

      }

      res.json({
        success: true,
        config,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,
        message:
          "Failed to update config",
      });

    }

  };