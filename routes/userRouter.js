const router=require('express').Router();
const {uploadUser,updateUser,getUser,login,checkLeaderBoard} = require('../controllers/userController');
const {protect}=require('../middlewares/protect');

router.get('/getuser',protect,getUser);

router.post('/login', login);

router.post('/uploaduser',uploadUser);

router.post('/updateUser',protect,updateUser);

router.get('/checkleaderboard',checkLeaderBoard);

module.exports=router;