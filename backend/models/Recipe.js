var mongoose = require('mongoose');

var RecipeSchema = new mongoose.Schema({
	name: String,
	duration: String,
	allergies: String,	
  	ingredients: [{type: mongoose.Schema.Types.ObjectId, 
      ref: 'Ingredient'}],
  	directions: String,
	creator: String,
	likes: Number
});
mongoose.model('Recipe', RecipeSchema);
