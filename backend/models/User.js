var mongoose = require('mongoose');
let crypto = require('crypto');
let jwt = require('jsonwebtoken');

var UserSchema = new mongoose.Schema({
	username: { type: String, lowercase: true, 
		unique: true },
    firstname: String,
    lastname: String,
    birthdate: Date,
  	hash: String,
  	salt: String,
    friends: [String],
    recipes: [String]
});

UserSchema.methods.setPassword = function (password){
	this.salt = crypto.randomBytes(32).toString('hex');
	this.hash = crypto.pbkdf2Sync(password, this.salt, 
	  10000, 64, 'sha512').toString('hex');
}

UserSchema.methods.validPassword = function (password) {
	let hash = crypto.pbkdf2Sync(password, this.salt, 
	  10000, 64, 'sha512').toString('hex');
    return this.hash === hash;
};

UserSchema.methods.generateJWT = function () {
  var today = new Date();
  var exp = new Date(today);
  exp.setDate(today.getDate() + 60);
	return jwt.sign({
      _id: this._id,
      username: this.username,
      exp: parseInt(exp.getTime() /1000)
  }, process.env.SECRET);
}

mongoose.model('User', UserSchema);