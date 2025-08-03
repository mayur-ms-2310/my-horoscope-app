import jwt from 'jsonwebtoken'
import crypto from 'node:crypto'
import { getUserByEmail } from '../controllers/user.controller';
import { NextFunction, Request, Response } from 'express';

export const tokenVerification = (req : Request | any ,res : Response,next : NextFunction)=>{
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        return res.status(401).json({ error: "Authorization bearer token is missing" });
    }
    let token = authHeader.split(" ")[1];
    try { 
    let payload : any = jwt.verify(token,'SECRET')
    req.user = payload

    next()
    
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized Invalid token' });
    }
}

export const passwordVerification = async (req : Request | any ,res : Response,next : Function)=>{
    try {
    let user : {email: string, password: string} = req.body;
   
    if(!user.email || !user.password) res.status(400).json({message:'invalid credentials'})
    
    let hashpassword = crypto.pbkdf2Sync(user.password, "SECRETSALT1234", 60, 64, "sha256").toString("hex");

    let  getUserEmail = await getUserByEmail(user.email)

    if(getUserEmail?.password !== hashpassword) res.status(400).json({message:'invalid email or password'})

    let token = jwt.sign({ userId : getUserEmail?.id, email : user.email, zodiac : getUserEmail?.zodiacSign },'SECRET',{ expiresIn: '1h' })
    
    res.status(200).send({message : `user logged In successfuly `, token : token});

    next()

    } catch (error) {
        res.status(400).json({messgae:'invalid user'});
    }
}