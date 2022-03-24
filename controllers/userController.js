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
            ques : "https://i.postimg.cc/hv2VcHjf/image1.png",
            ans : "summary",
            flagVal : true

        },
        {
             qno : 2,
            ques : "https://i.postimg.cc/Vkm5D7Lh/image17.png",
            ans : "43",
            flagVal : false
        },     
        {
             qno : 3,
            ques : "https://i.postimg.cc/qBF5sYQk/image14.png",
            ans : "blockchain",
            flagVal : false
        },
        {
             qno : 4,
            ques : "https://i.postimg.cc/GpZj8wdN/image10.png",
            ans : "40",
            flagVal : false
        },
        {
             qno : 5,
            ques : "https://i.postimg.cc/Rhbhh9zJ/image13.png",
            ans : "ramanujan",
            flagVal : false
        },
        {
             qno : 6,
            ques : "https://i.postimg.cc/c1bgm7V7/image18.png",
            ans : "mushroom",
            flagVal : false
        },
        {
             qno : 7,
            ques : "https://i.postimg.cc/fRZ9tzG1/image15.png",
            ans : "gulzar",
            flagVal : false
        },
        {
             qno : 8,
            ques : "https://i.postimg.cc/c1hyyXsY/image22.png",
            ans : "chair",
            flagVal : false
        },
        {
             qno : 9,
            ques : "https://i.postimg.cc/MpymNrwJ/image12.png",
            ans : "ratatouille",
            flagVal : false
        },
        {
             qno : 10,
            ques : "https://i.postimg.cc/2js9VtCg/image4.png",
            ans : "shakuntala devi",
            flagVal : false
        },
        {
             qno : 11,
            ques : "https://i.postimg.cc/bJQDLd2x/image23.png",
            ans : "open kettle",
            flagVal : false
        },
        {
             qno : 12,
            ques : "https://i.postimg.cc/MG0qFBdp/image20.png",
            ans : "ngo vision rescue",
            flagVal : false
        },
        {
             qno : 13,
            ques : "https://i.postimg.cc/d0fpnVKV/image21.png",
            ans : "south korea",
            flagVal : false
        },
        {
            qno : 14,
            ques : "https://i.postimg.cc/QdyfZYY6/image8.png",
            ans : "tim berners lee",
            flagVal : false
        },
        {
             qno : 15,
            ques : "https://i.postimg.cc/k5NRvBSx/image3.png",
            ans : "fc kohli",
            flagVal : false
        },
        {
             qno : 16,
            ques : "https://i.postimg.cc/2S7B41hn/image2.png",
            ans : "the wise little hen",
            flagVal : false
        },
        {
             qno : 17,
            ques : "https://i.postimg.cc/137yhPZL/image6.png",
            ans : "entanglement",
            flagVal : false
        },
        {
             qno : 18,
            ques : "https://i.postimg.cc/QtXmQLFd/image16.png",
            ans : "1",
            flagVal : false
        },
        {
             qno : 19,
            ques : "https://i.postimg.cc/QtHb4QJ2/image11.png",
            ans : "venkatraman iyer",
            flagVal : false
        },
        {
             qno : 20,
            ques : "https://i.postimg.cc/hts1KyyF/image9.png",
            ans : "40",
            flagVal : false
        },
        {
             qno : 21,
            ques : "https://i.postimg.cc/g2jn6gcb/image19.png",
            ans : "boston",
            flagVal : false
        },
        {
             qno : 22,
            ques : "https://i.postimg.cc/25YMKK1P/image5.png",
            ans : "alphazero",
            flagVal : false
        },
             {
             qno : 23,
            ques : "https://i.postimg.cc/J4wfX01r/image7.png",
            ans : "ohio state university",
            flagVal : false
        },
        {
            qno : 24,
           ques : "Thank you for playing!",
           ans : "goa",
           flagVal : true
       }
    ]
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
        const {username,password}=req.body;
        const user=await User.findOne({username});
        if(!user) res.status(400).json({error:"Invalid credentials!"});
        else{
            if(user.password!=password) res.status(400).json({error:"Invalid credentials!"});
            else{
                const token=await user.generateToken();
                res.status(200).send(token); 
            }
        }  
    } catch (error) {
        console.log(error);
        res.status(500).json({error:error});
    }
}




exports.updateUser=async(req,res)=>{
    try {
         const {idx}=req.body;
         if(idx>=24){
               let user =await  User.findOne({username:req.user.username});
               if(user.score==22){
                    await User.findOneAndUpdate({username:req.user.username},{score:23},{
                    new: true,
                    upsert: true
      });
               }
               res.status(201).send("Thanks wait for result");
         }
         else{

         const username = req.user.username
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

//Check leader board
exports.checkLeaderBoard=async(req,res)=>{
    try {
        const users=await User.find().sort({score:-1,updatedAt:1});
        res.status(200).send(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Something went wrong!"});
    }
}