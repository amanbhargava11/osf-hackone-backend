const Mentor =
  require("../models/Mentor");

exports.getAllMentors =
  async (req, res) => {

    try {

      const mentors =
        await Mentor.find();

      res.json({
        success: true,
        mentors,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message,
      });

    }

};

exports.createMentor =
  async (req, res) => {

    try {

      const mentor =
        await Mentor.create(req.body);

      res.json({
        success: true,
        mentor,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message,
      });

    }

};

exports.deleteMentor =
  async (req, res) => {

    try {

      await Mentor.findByIdAndDelete(
        req.params.id
      );

      res.json({
        success: true,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message,
      });

    }

};