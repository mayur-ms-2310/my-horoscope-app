
import { User, UserAttributes } from "../models/user.model";
import { getZodiacSign } from "../utils/calculateZodiac";
import {Response, Request} from 'express'

export const addUserController = async (req : Request, res:Response)=>{
     try {
        let user : UserAttributes = req.body;
        let zodiacSign = getZodiacSign(user.birthdate)
        console.log(zodiacSign)
        let userup = await User.create({...user,zodiacSign});
        res.status(201).json({message:`user signed up successfully : ${userup.dataValues.name} with zodiac ${userup.dataValues.zodiacSign}`});
        } catch (error) {
            res.status(400).json({message: error})
        }
}

export const getUser = (id: number): Promise<User | null> => {
    return User.findOne({ where: { id } });
}

export const getUserByEmail = (email: string): Promise<User | null> => {
    return User.findOne({ where: { email : email } });
}

