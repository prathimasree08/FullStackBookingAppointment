const path = require('path');
const details = require('../modals/details');
exports.AddUserDetails = async(req,res,next) => {
    try{
        console.log('Hello')
        const name = req.body.name;
        const phone = req.body.phone;
        
        const email = req.body.email;

        if(!phone){
            throw new Error("Phone Number is Mandatory!")
        
        }
        const data = await details.create({
            name:name,
            phone:phone,
            email:email
        })
        res.status(201).json({newUserDetail:data});
    }catch(err){
        console.log(err)
        res.status(500).json({error:err})
    }
}

exports.getUserDetails = async(req,res,next) => {
    try{
        const Users = await details.findAll();
        res.status(200).json({allUsers: Users})
    }catch(err){
        console.log(err);
        res.status(500).json({error:err})
    }
}
exports.deleteUserDetails = async(req,res,next) => {
    try{
        const id = req.params.id
        const user = await details.findAll({where:{id:id}})
        if(!user){
            console.log('user not exist')
            return res.sendStatus(400)
        }
        await details.destroy({where:{id:id}});
        res.sendStatus(200)
    }catch(err){
        console.log(err)
        res.status(500).json({error:err})
    }
}
exports.editUserDetails = async(re,res,next) => {
    try{
        const updatedname = req.body.name;
        const updatedphone = req.body.phone;
        const updatedemail = req.body.email;
        const id = req.params.id;

        console.log(req.params);
        console.log("abc");
        let user = await details.update({
            name: updatedname,
            email: updatedemail,
            phn: updatedphone,

        },
        {where: {id:id}}
        );
        console.log("user",user);
        res.status(201).json({user});
    }catch(err){
        console.log(err);
        res.status(500).json({error:err});
    }
};