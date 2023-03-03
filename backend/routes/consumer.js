const express = require("express");
const router = express.Router();
const ConsumerFormModel = require("../models/ConsumerForm");

const { check, validationResult } = require("express-validator");
const fetchUser = require("../middleware/fetchuser");


router.post(
  "/consumerdata", fetchUser,
  [
    check("type_of_organisation", "Select an Option").isEmail(),
    check("location", "Select an Option").isString(),
    check("area_of_setup", "Select an Option").isString(),
    check("bio_waste_generated", "Select an Option").isBoolean(),
    check("bio_waste_volume", "Select an Option").isNumber(),
    check("energy_consumption", "Select an Option").isNumber(),
  ],
  async (req, res) => {
    // Check if there are validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Return a response with a status code of 400 (Bad Request)
      return res.status(400).json("Enter valid data");
    }

    let { type_of_organisation, location, area_of_setup,bio_waste_generated, bio_waste_volume, energy_consumption
    } = req.body;

    try {
      const consumerdata = new ConsumerFormModel({
        type_of_organisation, 
        location, 
        area_of_setup,
        bio_waste_generated, 
        bio_waste_volume, 
        energy_consumption
      });
      const savedConsumerFormModel = await consumerdata.save();
      res.json(savedConsumerFormModel);
    } catch (err) {
      res.status(500).send("Internal error ocurred");
      console.log(err);
    }
  }
);

module.exports = router;
