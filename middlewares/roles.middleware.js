module.exports = (req, res, next) => {
  const roles = req.user.roles

  const allLinksAndRegExps = roles
    .map(({ permissions }) =>
      permissions.map(({ links }) =>
        links.map(item =>
          item.link ? { link: item.link } : { regExp: item.regExp }
        )
      )
    )
    .flat()
    .flat()

  const isRight = allLinksAndRegExps.find(item => {
    if (item.link) {
      return item.link === req.originalUrl
    }

    return !req.originalUrl.replace(RegExp(item.regExp), '').length
  })

  if (!isRight) {
    return res.status(404).json({})
  }

  req.user.maxLevelOfRoles = roles.reduce(
    (acc, role) => Math.min(acc, role.level),
    1000
  )
  req.user.components = roles
    .map(({ permissions }) => permissions.map(({ components }) => components))
    .flat()
    .reduce((acc, component) => ({ ...acc, ...component }))

  next()
}
