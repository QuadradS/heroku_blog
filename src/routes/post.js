import { Router } from 'express'
import checkToken from '../middlewares/checkToken'
import { postModel } from '../models/Post'
import multer from 'multer'


const router = Router()
const upload = multer({
  dest: 'src/static/post-images'
})
router.get('/getAll', checkToken, async function (req, res) {
  try {
    const posts = await postModel.find({})
    res.json(posts.map((p) => ({
      id: p._id,
      title: p.title.slice(0, 10),
      text: `${p.text.slice(0, 20)}...`,
      imageUrl: p.imageUrl
    })))
  } catch (e) {
    res.status(500).send(e.message)
  }
})

router.get('/getOne/:postID', checkToken, async function (req, res) {
  const postID = req.params.postID
  try {
    const post = await postModel.findOne({ _id: postID })
    res.json(post)
  } catch (e) {
    return res.status(500).send(e.message)
  }
})

router.post('/create', checkToken, upload.single('postImage'), async function (req, res) {
  const { title, text } = req.body
  const { tokenObject } = req

  const postObject = { title, text, userID: tokenObject._id, imageUrl: `post-images/${req.file.filename}` }
  try {
    const post = await postModel.create(postObject)
    res.json(post)
  } catch (e) {
    return res.status(500).send(e.message)
  }
})

router.get('/getById/:userID', checkToken, async function (req, res) {
  const { userID } = req.params
  try {
    const post = await postModel.find({ userID })
    res.json(post)
  } catch (e) {
    return res.status(500).send(e.message)
  }
})

export default router
