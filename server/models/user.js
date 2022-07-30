import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, maxLength: 30, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String, required: true }
})
userSchema.virtual('adopt', {
    ref: 'Adopt', 
    localField: '_id',
    foreignField: 'owner'
  })
  userSchema.set('toJSON', {
    virtuals: true,
    transform(_doc, json) {
      delete json.password
      return json
    }
  })
  userSchema 
  .virtual('passwordConfirmation')
  .set(function(passwordConfirmation){
    this._passwordConfirmation = passwordConfirmation 
  })
  userSchema
  .pre('validate', function(next){
    if (this.isModified('password') && this.password !== this._passwordConfirmation){
      // Invalidate the request
      this.invalidate('passwordConfirmation', 'Passwords do not match')
    }
    next()
  })
  userSchema
  .pre('save', function(next){
    if (this.isModified('password')){
      this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync())
    }
    next()
  })
  userSchema.methods.validatePassword = function(password){
    return bcrypt.compareSync(password, this.password)
  }
  mongoose.model('User', userSchema)