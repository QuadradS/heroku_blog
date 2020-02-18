import { model, Schema } from 'mongoose'

const commentSchema = new Schema({
  author: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  postID: {
    type: Schema.Types.ObjectId,
    ref: 'post'
  },
  authorID: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
})

export const commentModel = model('comment', commentSchema)
