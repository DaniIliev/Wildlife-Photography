const User = require('../model/User')


exports.register = (data) => User.create(data)

exports.findOne = (data) => User.findOne(data)

