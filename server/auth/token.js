const jwt = require('jsonwebtoken')
const { getUserByUsername } = require('../db/users')
const verifyJwt = require('express-jwt')
const { comparePasswordToHash } = require('./hash')

function issue (req, res) {
  getUserByUsername(req.body.userName)
    .then(user => {
      if (!user) {
        res.status(403).json({ message: 'User does not exist' })
      } else {
        // needs to be password_hash instead of hash to match db column name
        comparePasswordToHash(req.body.password, user.password_hash)
        .then((match) => {
          if (!match) {
            res.status(400).json({message: 'Password is incorrect'})
          } else {
            const token = createToken(user, process.env.JWT_SECRET)
            res.json({
              // *3
              message: 'Authentication successful',
              token
            })
          }
        })
        .catch(err => {
          res.status(500).json({message: err.message})
        })
      }
    })
}

function createToken(user, secret) {
  const payload = {
    // these values will go on the boday of the response
    user_id: user.id,
    user_name: user.user_name,
    image_url: user.image_url
  }

  const options = {
    expiresIn: '24h'
  }

  return jwt.sign(payload, secret, options)
}

function decode (req, res, next) {
  // what exactly is happening here?
  verifyJwt({ secret: process.env.JWT_SECRET, credentialsRequired: true })(req, res, next)
}

module.exports = {
  issue,
  decode,
}
