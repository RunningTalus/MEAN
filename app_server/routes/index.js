var express = require('express');
var router = express.Router();
var ctrlMain = require('../controllers/main');

/* GET home page. */
//router.get('/', function(req, res, next) {
//  res.render('index', { title: 'Express' });
//});

//var homepageController = function(req, res) {
//  res.render('index', { title: 'Express'});
//};

/* GET home page. */
//router.get('/', homepageController);

/* GET home page. */
router.get('/', ctrlMain.index);

module.exports = router;
