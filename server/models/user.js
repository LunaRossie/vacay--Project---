const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 7;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
    // todo ?? validate ?? lookup later
  },
  password: {
    type: String,
    required: true
    // todo ?? validate ?? lookup later
  }
});

// hooks for password updates/creations???
userSchema.pre('save', function(next) {
  var user = this;
  console.log({hookThis: user});
  
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});
// user.Schema.pre('save', (next, ...args) => {
//   console.log({hookThis: this});
//   console.log(args);
//   next();
// })

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
      if (err) return cb(err);
      cb(null, isMatch);
  });
};

const User = model('User', userSchema);

module.exports = User;



// import mongoose from 'mongoose'
// import bcrypt from 'bcrypt'

// const userSchema = new mongoose.Schema({
//   username: { type: String, required: true, maxLength: 30, unique: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   image: { type: String, required: true }
// })
// userSchema.virtual('adopt', {
//     ref: 'Adopt', 
//     localField: '_id',
//     foreignField: 'owner'
//   })
//   userSchema.set('toJSON', {
//     virtuals: true,
//     transform(_doc, json) {
//       delete json.password
//       return json
//     }
//   })
//   userSchema 
//   .virtual('passwordConfirmation')
//   .set(function(passwordConfirmation){
//     this._passwordConfirmation = passwordConfirmation 
//   })
//   userSchema
//   .pre('validate', function(next){
//     if (this.isModified('password') && this.password !== this._passwordConfirmation){
//       // Invalidate the request
//       this.invalidate('passwordConfirmation', 'Passwords do not match')
//     }
//     next()
//   })
//   userSchema
//   .pre('save', function(next){
//     if (this.isModified('password')){
//       this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync())
//     }
//     next()
//   })
//   userSchema.methods.validatePassword = function(password){
//     return bcrypt.compareSync(password, this.password)
//   }
//   mongoose.model('User', userSchema)