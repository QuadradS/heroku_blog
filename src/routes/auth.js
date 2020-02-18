import router from './post'
import { userModel } from '../models/User'
import jwt from 'jsonwebtoken'
import config from '../config'
import checkToken from '../middlewares/checkToken'
import * as bcrypt from 'bcrypt'

router.post('/signup', async (req, res, next) => {
  const { login, name, password } = req.body
  try {
    const hashedPassword = await bcrypt.hash(password, 12)
    let user = await userModel.create({ login, name, password: hashedPassword })
    return res.json({name: user.name, login: user.login, _id: user._id})
  } catch ({ message }) {
    return res.status(400).send({message: 'bad credes'})
  }
})

router.post('/signin', async (req, res, next) => {
  const { login, password } = req.body
  const user = await userModel.findOne({ login })
  if (!user) {
    return res.status(400).send({ message: 'user nor found' })
  }

  try {
    const result = await user.comparePasswords(password)
  } catch (e) {
    return next({
      status: 400,
      message: 'Bad Creds'
    })
  }

  const token = jwt.sign({ _id: user._id }, config.secret)
  res.json({ token })
})

router.post('/checkToken', checkToken, async (req, res, next) => {
  const { _id } = req.tokenObject
  const user = await userModel.findOne({ _id })
  if (!user) {
    return res.status(400).send({ message: 'user not auth' })
  }

  res.status(200).json({ message: 'Success' })
})

export default router
