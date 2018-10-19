var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(student);
  
  res.render('index', { student });
});

module.exports = router;
