import express from 'express';
import usersController from '../controller/userController.js';
import validateToken from '../validateToken.js';


const app = express()
const router = express.Router();

// app.use(validateToken)  //it means all below route are secured not above route



//Post info
router.post('/', usersController.postData)

router.post('/registration', usersController.registration)
router.post('/login', usersController.login)
router.post('/resetPwd', usersController.resetPwd)
router.post('/forgotPwd', usersController.forgetPwd)  //OTP generate
router.post('/verifyOTP', usersController.verifyOtp)  //OTP verify and password change
 
// Get All info
// router.get('/', usersController.getAll)
router.get('/', validateToken, usersController.getAll)  //wants route secure by token
 
 

//Get by ID
//localhost:4000/api/6516b29694370c188d103a94
router.get('/:id', usersController.getById)


//Update by ID
router.put('/:id', usersController.updateById)



//Delete by ID
router.delete('/:id', usersController.deleteById )










//OR Get by username
// router.get('/:userName', usersController.getByUserName)

//OR Update by username
// router.put('/:userName', usersController.updateBUserName)

export default router;

