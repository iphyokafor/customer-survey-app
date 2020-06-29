const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin'){
    return res.status(401).json({
      status: 401,
      message: 'Unauthorized'
    })
  }
 return next()
}

export default isAdmin;