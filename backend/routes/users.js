var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');
let User = mongoose.model('User');
let Recipe = mongoose.model('Recipe');
let Ingredient = mongoose.model('Ingredient');
let jwt = require('express-jwt');
let auth = jwt({secret: process.env.SECRET, userProperty: 'payload'});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.param('user', function(req, res, next, id) {
  let query = User.findById(id);
  query.exec(function (err, user){
    if (err) { return next(err); }
    if (!user) { return next(new Error('not found ' + id)); }
    req.user = user;
    return next();
  });
}); 

router.get('/all', function(req, res, next) {
  let query = User.find().populate('friends');
  query.exec(function(err, users) {
    if (err) return next(err);
    res.json(users);
  })
});
router.get('/user/:user', function(req, res, next) {
  req.user.populate('friends', function(err, use) {
      if (err) return next(err);
      res.json(use);
    });
});

router.post('/register', function(req, res, next){
  if(!req.body.username || !req.body.password){
      return res.status(400).json(
        {message: 'Please fill out all fields'});
  }
  var user = new User();
  user.username = req.body.username;
  user.friends = ["5a29c21ca24472142c8fd703"];
  user.setPassword(req.body.password)
  user.save(function (err){
      if(err){ return next(err); }
      return res.json({token: user.generateJWT()})
  });
});

router.post('/login', function(req, res, next){
  if(!req.body.username || !req.body.password){
    return res.status(400).json({message: 'Please fill out all fields'});
  }
  passport.authenticate('local', function(err, user, info){
    if(err){ return next(err); }
    if(user){
      return res.json({token: user.generateJWT(), id:user._id});
    } else {
      return res.status(401).json(info);
    }
  })(req, res, next);
});

router.post('/checkusername', function(req, res, next) {
    User.find({username: req.body.username}, function(err, result) {
      if (result.length) {
        res.json({'username': 'alreadyexists',})
      } else {
        res.json({'username': 'ok'})
      }
    });
});

router.get('/getID/:user', function(req, res, next) {
   req.user.populate('friends', function(err, use) {
      if (err) return next(err);
      res.json(use);
    });
});
router.post('user/:user/friends', function(req, res, next) {
    let ing = new User(req.body);

    ing.save(function(err, user) {
      if (err) return next(err);
      
      req.user.friends.push(user);
      req.user.save(function(err, rec) {
        if (err) return next(err);
        res.json(user);
      })
    });
  });


module.exports = router;
