const express = require("express");
const router = express.Router();
const multer = require("multer");
const {Product} =require("../models/Product");

//=================================
//             Product
//=================================

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

var upload = multer({ storage: storage }).single("file");


router.post("/image", (req, res) => {
  // Save image data which send from front end
  // Use multer libary (Install libarary)
    upload(req,res,err=> {
        if(err) {
            return req.json({success:false, err});
        }
        // Send to front-end about info what image file was saved
        return res.json({success:true, filePath:res.req.file.path ,fileName:res.req.file.filename});
    })

});

router.post("/", (req, res) => {
  
  // The data filled out form by submit, save this data to DB
  const product = new Product(req.body);
  product.save((err)=> {
    if(err) return res.status(400).json({success:false});
    return res.status(200).json({success:true});
  })

});


router.post("/products", (req, res) => {
  

  
  // Get all data from product collection
  // Find all data from `Product` collection
  Product.find()

    .exec((err,productInfo)=> {
      if(err) return res.status(400).json({success:false, err});
      return res.status(200).json({success:true, productInfo});
    })
});

module.exports = router;
