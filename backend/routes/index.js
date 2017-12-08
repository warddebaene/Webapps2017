var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
let Recipe = mongoose.model('Recipe');
let Ingredient = mongoose.model('Ingredient');
let jwt = require('express-jwt');
let auth = jwt({secret: process.env.SECRET, userProperty: 'payload'});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.param('recipe', function(req, res, next, id) {
  let query = Recipe.findById(id);
  query.exec(function (err, recipe){
    if (err) { return next(err); }
    if (!recipe) { return next(new Error('not found ' + id)); }
    req.recipe = recipe;
    return next();
  });
});  

router.get('/API/recipes/', function(req, res, next) {
	let query = Recipe.find().populate('ingredients');
  query.exec(function(err, recipes) {
    if (err) return next(err);
    res.json(recipes);
  })
});

router.post('/API/recipes/', function(req, res, next) {
	let recipe = new Recipe({name: req.body.name, duration: req.body.duration, allergies: req.body.allergies,
    directions: req.body.directions, creator: req.body.creator, likes: req.body.likes});
	recipe.save(function(err, rec){
		if (err) {return next(err); }
		res.json(rec);
	});
});

router.get('/API/recipe/:recipe', auth, function(req, res, next) {
		req.recipe.populate('ingredients', function(err, rec) {
      if (err) return next(err);
      res.json(rec);
    });
});

router.delete('/API/recipe/:recipe', auth, function(req, res, next) {
  Ingredient.remove({_id: {$in: req.recipe.ingredients}},
    function (err) {
      if(err) return next(err);
      req.recipe.remove(function(err) {
        if(err) return next(err);
        res.json(req.recipe);
      })
    })
});

router.post('/API/recipe/:recipe/ingredients',
  function(req, res, next) {
    let ing = new Ingredient(req.body);

    ing.save(function(err, ingredient) {
      if(err) return next(err);

      req.recipe.ingredients.push(ingredient);
      req.recipe.save(function(err, rec) {
        if(err) return next(err);

      res.json(ingredient);
      })
    });

});


module.exports = router;
