import express from 'express';
import productController from '../controller/productController.js';
import multer from 'multer';




 const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'src/productPic/images'); // Specify the directory where files will be saved . we input from FE and save image in this folder by this syntax
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '_' + file.originalname); // Use the original file name
  },
 });
 
 const upload = multer({ storage : storage });






const router = express.Router();

//Post info 
//productPicture is the name attribute of input file tag
router.post('/', upload.single('productPicture'),  productController.postData)

// Get All info
router.get('/', productController.getAll)
 

//Get by ID
//localhost:4000/api/6516b29694370c188d103a94
router.get('/:id', productController.getById)


//Update by ID
router.put('/:id', productController.updateById)



//Delete by ID
router.delete('/:id', productController.deleteById )


//OR Get by username
// router.get('/:title', productController.getByProductTitle)

//OR Update by username
// router.put('/:title', productController.updateByProductTitle)

export default router;




