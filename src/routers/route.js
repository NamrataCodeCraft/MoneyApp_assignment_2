const express = require('express')
const router = express.Router()
const blogController = require('../controllers/blogController')
const userController = require('../controllers/userController')
const reviewController = require('../controllers/reviewController')

router.post('/user', userController.createUser)
router.get('/user', userController.login)

router.post('/blog', blogController.createBlog)
router.get('/blogs' ,blogController.getAllBlogs)
router.get('/blog/:blogId' , blogController.getBlogById)
router.put('/blog/:blogId', blogController.updateBlog)
router.delete('/blog/:blogId', blogController.deleteBlog)

router.post('/review', reviewController.createReview)
router.delete('/review/:id', reviewController.deleteReviwe)




router.all('*', (req,res)=> res.status(404).send("URL NOT FOUND"))


module.exports = router