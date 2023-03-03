const express = require("express");
const router = express.Router();
const EnergySourceModel = require("../models/EnergySource");

const { check, validationResult } = require("express-validator");
const fetchUser = require("../middleware/fetchuser");


router.post(
  "/energy_source", fetchUser,
  [
    check("type_of_source", "Select an Option").isEmail(),
    // check("customised_cost_solar", "Input Valid Cost").isNumber(),
    // check("customised_cost_bio", "Input Valid Cost").isNumber(),
    // check("customised_cost_solar_bio", "Input Valid Cost").isNumber(),
  ],
  async (req, res) => {
    // Check if there are validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Return a response with a status code of 400 (Bad Request)
      return res.status(400).json("Enter valid data");
    }

    let { type_of_source, customised_cost_solar, customised_cost_bio, customised_cost_solar_bio
    } = req.body;

    try {
      const energy_source = new EnergySourceModel ({
        type_of_source, 
        customised_cost_solar, 
        customised_cost_bio, 
        customised_cost_solar_bio
      });
      const savedEnergySourceModel  = await energy_source.save();
      res.json(savedConsumerFormModel);
    } catch (err) {
      res.status(500).send("Internal error ocurred");
      console.log(err);
    }
  }
);

module.exports = router;
