import { model, Schema } from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new Schema({
  name: {
    type: String,
    required: false
  },
  login: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  password: {
    type: String,
    required: true
  }
})

userSchema.methods.comparePasswords = function (password) {
  return bcrypt.compare(password, this.password)
}

export const userModel = model('user', userSchema)
