const router=require('express').Router();
const {uploadUser,updateUser,getUser,login} = require('../controllers/userController');
const {protect}=require('../middlewares/protect');

router.get('/getuser',protect,getUser);

router.post('/login', login);

router.post('/uploaduser',uploadUser);

router.post('/updateUser',protect,updateUser);


module.exports=router;