const express = require("express");
const router = express.Router();
const ProductDataModel = require("../models/ProductData");

const { check, validationResult } = require("express-validator");
const fetchUser = require("../middleware/fetchuser");


router.post(
  "/product_data", fetchUser,
  [
    check("type_of_source", "Select an Option").isString(),
    check("service_location", "Invalid Input").isString(),
    check("subsidy_scheme", "Enter a Scheme").isString(),
    // check("subsidy_percentage", "Enter Subsidy Percentage").isNumber(),

  ],
  async (req, res) => {
    // Check if there are validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Return a response with a status code of 400 (Bad Request)
      return res.status(400).json("Enter valid data");
    }

    let {  type_of_source, service_location, subsidy_scheme, subsidy_percentage
    } = req.body;

    try {
      const userid = req.user.id;
      const product_data = new ProductDataModel({
        type_of_source, 
        service_location, 
        subsidy_scheme, 
        subsidy_percentage,
        user: userid,
      });
      const savedProductDataModel = await product_data.save();
      res.json(savedProductDataModel);
    } catch (err) {
      res.status(500).send("Internal error ocurred");
      console.log(err);
    }
  }
);

module.exports = router;
