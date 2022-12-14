const {Router} = require('express');
const router = Router();
const authController = require('../controllers/authControllers');


//  requests -->
router.get('/signup',authController.signup_get); 
router.post('/signup',authController.signup_post);
router.get('/login',authController.login_get);
router.post('/login',authController.login_post);
router.get('/details',authController.getDetail);
module.exports = router;