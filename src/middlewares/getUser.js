import { getUSerByToken } from '../services/userService'

export default async (req, res, next) => {
  try {
    req.user = await getUSerByToken(req.tokenObject)
  } catch ({ message }) {
    next({ status: 500, message })
  }
  req.TEST = {test: 'TESTESTTE'}
  next()
}
