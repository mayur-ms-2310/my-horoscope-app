import { Router } from "express";
import { getDailyHoroscopeController, getHistoryHoroscopeController} from "../controllers/horoscope.controller";

export const horoscopeRouter : Router = Router()


/**
 * @swagger
 * /horoscope/today:
 *   get:
 *     summary: Get today's daily horoscope for the authenticated user
 *     tags: [Horoscope]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Today's horoscope
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 date:
 *                   type: string
 *                 zodiac:
 *                   type: string
 *                 horoscope:
 *                   type: string
 *       401:
 *         description: Unauthorized
 */


horoscopeRouter.get('/today',getDailyHoroscopeController)



/**
 * @swagger
 * /horoscope/history:
 *   get:
 *     summary: Get the last 7 days' horoscopes for the authenticated user
 *     tags: [Horoscope]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Horoscope history (last 7 days)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 zodiac:
 *                   type: string
 *                 history:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       date:
 *                         type: string
 *                       horoscope:
 *                         type: string
 *       401:
 *         description: Unauthorized
 */


horoscopeRouter.get('/history',getHistoryHoroscopeController)