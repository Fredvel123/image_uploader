const Images = require('../models/images.models');
// multer
const fs = require('fs-extra');
const path = require('path');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../images'))
  },
  filename:  (req, file, cb) => {
    const name = `${new Date().getTime()}${file.originalname}`
    cb(null, name);
  }
})
const upload = multer({
  storage
})
exports.uploadMiddleware = upload.single('image');
// cloudinary
const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true
})

exports.uploadImage = async (req, res) => {
  if(!req.file) {
    res.json({message: 'No image uploaded, please insert one!'})
  }else {
    const resCloudinary = await cloudinary.uploader.upload(req.file.path);
    const image = await Images.create({
      image: resCloudinary.secure_url,
      title: req.body.title,
      public_id: resCloudinary.public_id
    })
    // const newImage = await image.save();
    if(image) {
      res.json({
        message: 'the image was stored successfully',
        data: image
      })
    }else {
      res.send({
        message: "error uploading image, try again"
      })      
    }
    await fs.unlink(req.file.path);
  }
}

exports.removeImage = async (req, res) => {
  const {id} = req.params;
  const public_id = await Images.findOne({where: {id}});
  const removed = await cloudinary.uploader.destroy(public_id.public_id);
  if(removed) {
    const image = await Images.destroy({where: {id}});
    if(image) {
      res.send({message: `the image with id: ${id} was removed successfully `})
    }else {
      res.send({message: 'there is a error removing this image'})
    }
  }else {
    res.send({message: 'image not found'})
  }
}

exports.getImageById = async (req, res) => {
  const {id} = req.params;
  const image = await Images.findOne({where: {id}});
  if(image) {
    res.json(image);
  }else {
    res.json({message: `error looking for image with id:${id}`})
  }
}

exports.getAllImages = async (req, res) => {
  try {
    const images = await Images.findAll();
    if(images.length > 0) {
      res.send(images)
    }else {
      res.send({
        message: 'There is no images added yet.'
      })
    }
  } catch (err) {
    res.send(err)
  }
}

