import express from 'express';
import orderController from '../controller/orderController.js';


const router = express.Router();

//Post info
router.post('/', orderController.postData)

// Get All info
router.get('/', orderController.getAll)
 

//Get by ID
//localhost:4000/api/6516b29694370c188d103a94
router.get('/:id', orderController.getById)


//Update by ID
router.put('/:id', orderController.updateById)



//Delete by ID
router.delete('/:id', orderController.deleteById )


//OR Get by username
// router.get('/:title', orderController.getByorderTitle)

//OR Update by username
// router.put('/:title', orderController.updateByorderTitle)

export default router;




