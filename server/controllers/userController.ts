import {Request, Response} from "express"
import jwt from "jsonwebtoken"
import UserDetail from "../models/userDetail"
import bcrypt from "bcryptjs"

export const userLogin = async(req : Request,res : Response) =>{
    try{ ;
        const {email  , password } = req.body;
        if(!email || !password){
            res.status(404).json({
                message:"Details is incomplete",
                success:false
            })
            return;
        }

        const user: any = await UserDetail.findOne({where:{
            email:email,
        }})

        if(!user){
            res.status(404).json({
                message:"User is not exit please Register first",
                success:false
            })
            return;
        }

        if(!await bcrypt.compare(password,user.password)){
            res.status(409).json({
                success:false,
                message:"user login successfullly"
            })
        }
    
        const payload = {
            userId:user.id,
            email
        }

        const token = await jwt.sign(payload, process.env.SECREAT_KEY as string, {
            expiresIn:"1h"
        })

        res.status(200).json({
            user,
            token,
            message:"token generate succesfully"
        })
        
    } catch(error){
        res.status(500).json({
            message:error
            
        })
        console.log(error)
    }

}

export const userSignup = async(req:Request, res:Response) => {
    try{
        const {firstName, lastName, email,password} = req.body;
        // checking that user is already exist or not
        const exsistUser = await UserDetail.findOne({where:{
            email:email
        }})

        if(exsistUser){
            res.status(400).json({
                message:"User is already exist",
                success:false
            })
            return;
        }
        
        const hashedPassword = await bcrypt.hash(password,10);
        // password = hashedPassword;
        console.log(hashedPassword);
        const newUser = await UserDetail.create({firstName, lastName,email,password:hashedPassword});

        if(newUser){
            res.status(201).json({
                success:true,
                message:"User Registered Successfullly"
            })
            return;
        }
        else{
            res.status(400).json({
                success:false,
                messagge:"problem in creating user"
            })
        }


    } catch(error){
        res.status(500).json({
            message:"problem in creating user profile",
            success:false
        })
        console.log(error)
    }
}

export const userProfile = async(req:any, res:Response) =>{
    try{
        const {user} = req;
        console.log("user Profile::::::::::",user);

        res.status(200).json({
            success:true,
            user,
            message:"User Data Fetch successfully"
        })
        return;       
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:"Unable to fetch details"
        })
    }   
}

export const updateProfile  = async(req:any, res:Response) => {
    try{
        const {user} = req;

        const {firstName, lastName,email, dateOfBirth,gender,phoneNo} = req.body;

        const fetchUser : any = await UserDetail.findByPk(user.id);

        fetchUser.firstName = firstName;
        fetchUser.lastName = lastName;
        fetchUser.email = email;
        fetchUser.dataOfBirth = dateOfBirth;
        fetchUser.gender = gender;
        fetchUser.phoneNo = phoneNo;

        await fetchUser.save();

        res.status(200).json({
            success:true,
            message:"Update value successfull"
        })
        return;

        

    } catch(error){
        res.status(500).json({
            success:false,
            message:"Unable to update details"
        })      
    }
}