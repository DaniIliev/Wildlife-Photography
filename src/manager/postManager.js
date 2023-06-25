const Post = require('../model/Post')

exports.create = (data) => Post.create(data)

exports.findAll = (data) => Post.find()

exports.findById = (id) => Post.findById(id).populate('author')