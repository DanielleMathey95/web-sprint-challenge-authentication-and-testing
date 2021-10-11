const {jwtSecret} = require('./secret');
const jwt = require('jsonwebtoken');
const Users = require('../users/users-model');

//ON FAILED REGISTRATION OR LOGIN DUE TO MISSING USERNAME OR PASSWORD FROM THE REQ BODY
//RETURN 'USERNAME AND PASSWORD REQUIRED'

const checkPayload = (req, res, next) => {
  try {
    const {username, password} = req.body
    if(!username || !password) {
      res.status(404).json({message: 'username and password required'})
    } else {
      req.username = username,
      req.password = password
      next()
    }
  } catch (err){
    next(err)
  }
}

//ON FAILED REGISTRATION DUE TO USERNAME BEING TAKEN 
//RETURN 'USERNAME TAKEN'

const uniqueUsername = async(req, res, next) => {
  try {
    const existingUsername = await Users.getByUsername(req.body.username)
    if(existingUsername) {
      next({status: 400, message: 'username taken'})
    } else {
      next()
    }
  } catch(err) {
    next(err)
  }
}

//ON FAILED LOGIN DUE TO USERNAME NOT EXISTING IN THE DB OR THE PASSWORD NOT BEING CORRECT
//RETURN 'INVALID CREDENTIALS'

const checkLoginPayload = async(req, res, next) => {
  try {
    const user = await Users.getByUsername(req.body.username)
    const password = await Users.validatePassword(req.body.password)
    if(!user || !password) {
      next({ status: 400, message: 'invalid credentials'})
    }
  } catch(err) {
    next(err)
  }
}

module.exports = {
  checkPayload, 
  uniqueUsername, 
  checkLoginPayload
}