const express = require("express");
// const { validate } = require('express-validation');
// const uploader=require('../Utils/ImageUpload')
const userController = require("../Controllers/userController.js");
// const schemaValidation=require('../Validation/schemaValidation')
// console.log(schemaValidation.userValidation);
const router = express.Router();
router.post('/createChats',userController.createUserChat)
router.get('/getDetails',userController.getAllUsersDetails)
module.exports = router;
