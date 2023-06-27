const Post = require('../model/Post')

exports.create = (data) => Post.create(data)

exports.findAll = (data) => Post.find()

exports.findById = (id) => Post.findById(id).populate('author')

exports.delete = (id) => Post.findByIdAndDelete(id)

exports.update = (id, data) => Post.findByIdAndUpdate(id,data)