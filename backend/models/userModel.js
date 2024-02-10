//MongoDB Schema User (users)

const mongoose = require('mongoose')

//new schema, call it userSchema. It looks like mongoose.Schema({}:{})
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
  },
  {
    timestamps: true,
  }
)

//model is dubbed 'User' and uses userSchema.
module.exports = mongoose.model('User', userSchema)
