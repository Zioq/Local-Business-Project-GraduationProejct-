const express = require('express');
const router = express.Router();
const multer = require("multer");
const {Table} = require("../models/Table");

//=================================
//             Table
//=================================

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads2/");
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

// The data filled out form by submit, save this data to DB
router.post("/", (req,res) => {
    const table = new Table(req.body);

    table.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        console.log(req.body);
        return res.status(200).json({
            success: true
        });
    });
});

router.post("/reservation/status", (req,res)=> {

    // get the body what send from front-end
  let limit = req.body.limit ? parseInt(req.body.limit) : 20;
  let skip = req.body.skip  ? parseInt(req.body.skip) :0;


  // add condtion for filters
  let findArgs = {};

  for(let key in req.body.filters) {

    //key means `continents` or `price`
    if(req.body.filters[key].length > 0) {

      console.log('key', key);

      findArgs[key] = req.body.filters[key];

    }


  }

  console.log('findArgs',findArgs);

  
  // Get all data from product collection
  // Find all data from `Table` collection with findArgs(`location` field)
  Product.find(findArgs)
    .skip(skip)
    .limit(limit)
    .exec((err,TableInfo)=> {
      if(err) return res.status(400).json({success:false, err});
      return res.status(200).json({success:true, TableInfo});
    })



})

module.exports = router;
