// userInViews.js
export default function() {
  return function(req, res, next) {
    res.locals.user = req.user
    next()
  }
}
