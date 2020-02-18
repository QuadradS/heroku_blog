import {userModel} from '../models/User'


export async function getUSerByToken(token) {

  const { _id } = token
  let user
  try {
    user = await userModel.findOne({ _id }, { password: 0 })
  } catch (e) {
    throw e
  }

  return user
}
