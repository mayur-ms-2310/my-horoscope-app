import { userSignupSchema } from "../utils/userValidation";
import { NextFunction, Request, Response } from 'express';

  export const userValidation = (req : Request ,res : Response ,next : NextFunction)=>{
  const { error, value } = userSignupSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const errors = error.details.map(detail => detail.message);
    return res.status(400).json({message: errors });
  }
 next()
}
  
