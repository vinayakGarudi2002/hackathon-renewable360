const express = require("express");
const router = express.Router();
const ProductDataModel = require("../models/ProductData");
// const multer = require('multer');
// const { v4: uuidv4 } = require('uuid');

const { check, validationResult } = require("express-validator");
const fetchUser = require("../middleware/fetchuser");

// const storage = multer.diskStorage({
//   destination: function(req, file, cb) {
//       cb(null, 'images');
//   },
//   filename: function(req, file, cb) {   
//       cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
//   }
// });

// const fileFilter = (req, file, cb) => {
//   const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
//   if(allowedFileTypes.includes(file.mimetype)) {
//       cb(null, true);
//   } else {
//       cb(null, false);
//   }
// }

// let upload = multer({ storage, fileFilter });

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

    // const product_photo = req.file.filename;

    let {  type_of_source, service_location, subsidy_scheme, subsidy_percentage, industry_certification_name, industry_certification_no, cost_per_unit_of_clean_energy_setup
    } = req.body;

    try {
      const userid = req.user.id;
      const product_data = new ProductDataModel({
        type_of_source, 
        service_location, 
        subsidy_scheme, 
        subsidy_percentage,
        industry_certification_name,
        industry_certification_no,
        cost_per_unit_of_clean_energy_setup,
        // product_photo,
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
