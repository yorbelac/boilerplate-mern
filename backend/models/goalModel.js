//MongoDB Schema Goal (goals)

//requires mongoose
const mongoose = require('mongoose')

// defines schema as an object ({keys:values},{options})
const goalSchema = mongoose.Schema(
  {
    //User._id is implied and always created automatically
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    text: {
      type: String,
      required: [true, 'Please add a text value'],
    },
  },
  {
    //this option creates User.createdAt and User.updatedAt, in this schema, it results in an object with 5 key:value pairs
    timestamps: true,
  }
)

//exports mongoose.model('name', whichSchema)
module.exports = mongoose.model('Goal', goalSchema)
