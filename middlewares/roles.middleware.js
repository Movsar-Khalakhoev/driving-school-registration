module.exports = (req, res, next) => {
  const roles = req.user.roles

  roles.forEach(({ permissions }) => {
    if (req.originalUrl[req.originalUrl.length - 1] === '/') {
      req.originalUrl = req.originalUrl.slice(0, req.originalUrl.length - 1)
    }

    if (
      !permissions.find(permission => {
        if (permission.link) {
          return permission.link === req.originalUrl
        } else if (permission.regExp) {
          return !req.originalUrl.replace(RegExp(permission.regExp), '').length
        }
      })
    ) {
      console.log(req.originalUrl, 'Доступ запрещен!')
      return res.status(404).json({})
    }

    console.log(req.originalUrl, 'Доступ разрещен!')
    next()
  })
}
