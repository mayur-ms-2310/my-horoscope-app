import { userSignupSchema } from "../utils/userValidation";
import { Request, Response } from 'express';

  export const userValidation = (req : Request ,res : Response ,next : Function)=>{
  const { error, value } = userSignupSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const errors = error.details.map(detail => detail.message);
    return res.status(400).json({message: errors });
  }
 next()
}
  
