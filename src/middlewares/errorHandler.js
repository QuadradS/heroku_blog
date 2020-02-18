export default (err,next) => {

  let { status = 500, message = 'server error' } = err
  next.status(status).json({ message })
}
