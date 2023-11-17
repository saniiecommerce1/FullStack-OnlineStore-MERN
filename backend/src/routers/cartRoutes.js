import express from 'express';
import cartController from '../controller/cartController.js';


const router = express.Router();

//Post info
router.post('/', cartController.postData)

// Get All info
router.get('/', cartController.getAll)
 

//Get by ID
//localhost:4000/api/6516b29694370c188d103a94
router.get('/:id', cartController.getById)


//Update by ID
router.put('/:id', cartController.updateById)



//Delete by ID
router.delete('/:id', cartController.deleteById )


//OR Get by username
// router.get('/:title', cartController.getBycartTitle)

//OR Update by username
// router.put('/:title', cartController.updateBycartTitle)

export default router;




