const router=require('express').Router();
const {uploadUser,updateUser,getUser,login,checkLeaderBoard} = require('../controllers/userController');
const {protect}=require('../middlewares/protect');

router.get(process.env.GET_USER,protect,getUser);

router.post(process.env.LOGIN, login);

router.post(process.env.UPLOAD,uploadUser);

router.post(process.env.UPDATE,protect,updateUser);

router.get(process.env.CHECKLEADERBOARD,checkLeaderBoard);

module.exports=router;