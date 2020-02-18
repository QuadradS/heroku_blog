import { Router } from 'express'
import checkToken from '../middlewares/checkToken'
import { commentModel } from '../models/Comment'

const router = Router()

router.get('/getByPostId/:id', checkToken, async function (req, res) {
  const postID = req.params.id
  try {
    const result = await commentModel.find({ postID })
    res.json(result)
  } catch ({ message }) {
    res.status(500).json({ message })
  }
})

router.post('/create/:postID', checkToken, async function (req, res) {
  const postID = req.params.postID
  const { author, text, authorID } = req.body

  const commentObj = {
    author, text, postID, authorID
  }
  try {
    const result = await commentModel.create(commentObj)
    res.json(result)
  } catch ({ message }) {
    res.status(500).json({ message })
  }
})

export default router
