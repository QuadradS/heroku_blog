import { Router } from 'express'
import checkToken from '../middlewares/checkToken'
import { getUSerByToken } from '../services/userService'

const router = Router()

router.get('/', checkToken, async (req, res, next) => {
  const { tokenObject } = req
  try {
    let user = await getUSerByToken(tokenObject)
    return res.json(user)
  } catch ({ message }) {
    return next({
      status: 500,
      message
    })
  }
})





export default router
