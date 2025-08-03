import { Router  } from "express";
import { addUserController} from "../controllers/user.controller";
import { userValidation } from "../middlewares/user.middleware";
import { passwordVerification } from "../middlewares/auth.middleware";



export const userRouter : Router = Router()


/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: User login and JWT issuing
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: JWT token and user info
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Invalid credentials
 */

userRouter.post('/login', passwordVerification);


/**
 * @swagger
 * /user/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password, birthdate]
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               birthdate:
 *                 type: string
 *                 example: "dd/mm/yyyy"
 *     responses:
 *       201:
 *         description: User created
 */

userRouter.post('/signup', userValidation, addUserController);
