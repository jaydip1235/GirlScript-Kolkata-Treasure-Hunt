const User=require('../models/User');
const jwt = require('jsonwebtoken')



//Get a user
exports.getUser=async(req,res)=>{
    try {
        res.status(200).send(req.user);
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Something went wrong!"});
    }
}


exports.uploadUser=async(req,res)=>{
    try {
        const {username,password}=req.body;
        const questions=[
        {
            qno : 1,
            ques : "Captial of West Bengal",
            ans : "kolkata",
            flagVal : true

        },
        {
             qno : 2,
            ques : "National Animal",
            ans : "tiger",
            flagVal : false
        },     
        {
             qno : 3,
            ques : "question 3",
            ans : "ans3",
            flagVal : false
        },
        {
             qno : 4,
            ques : "question 4",
            ans : "ans4",
            flagVal : false
        }]
        const score=0;
        const newUser=new User({username,password,questions,score});
        newUser.save();
        res.status(201).send(newUser);
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Something went wrong!"});
    }
}



exports.login=async(req,res)=>{
    try {
        console.log("sdsdds")
        const {username,password}=req.body;
        const user=await User.findOne({username});
        if(!user) res.status(400).json({error:"Invalid credentials!"});
        const token=await user.generateToken();
        res.status(200).send(token);   
    } catch (error) {
        console.log(error);
        res.status(500).json({error:error});
    }
}




exports.updateUser=async(req,res)=>{
    try {
         const {idx}=req.body;
         console.log(idx+" index");
         if(idx===5){
               let user =await  User.findOne({username:req.user.username});
            //    console.log(user.score)
               if(user.score==3){
                    await User.findOneAndUpdate({username:req.user.username},{score:4},{
                    new: true,
                    upsert: true
      });
               }
               res.status(201).send("Thanks wait for result");
         }
         else{
         console.log(req.user.username)
         const username = req.user.username
          console.log("2")
         if(!username){
              res.status(404).json({error:"User not found!"});
         }
         else{
         await User.findOneAndUpdate({username},{score:idx-1},{
          new: true,
          upsert: true
      });
         const ress = await User.findOneAndUpdate(
            {username:username, "questions.qno": idx },
            {
            $set: {
            "questions.$.flagVal": true,
         }
        },
         {
          new: true,
          upsert: true
      })
       res.status(201).send(ress.questions[idx-1]);
    }
}

    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Something went wrong!"});
    }
}

//Create room
// exports.createRoom=async(req,res)=>{
//     try {
//         const code=new Code({username:req.body.username});
//         await code.save();
//         res.status(201).send(code);
//     } catch (error) {
//         console.log(error);
//     }
// }