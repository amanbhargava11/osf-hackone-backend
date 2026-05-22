const Judge = require("../models/Judge");

exports.getAllJudges = async (req, res) => {
  try {

    const judges = await Judge.find();

    res.json({
      success: true,
      judges,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

exports.createJudge = async (req, res) => {
  try {

    const {
      name,
      email,
      domain,
    } = req.body;

    const judge = await Judge.create({
      name,
      email,
      domain,
    });

    res.json({
      success: true,
      judge,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

exports.deleteJudge = async (req, res) => {
  try {

    await Judge.findByIdAndDelete(
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