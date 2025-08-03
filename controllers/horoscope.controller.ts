import fs from 'fs'
import { HoroscopeHistory, HoroscopeHistoryAttributes } from '../models/userHistory';
import {Response, Request} from 'express'


interface user {
  userId : number,
  email : string,
  zodiac : string
}


export const getDailyHoroscopeController = async (req : Request, res : Response) => {
  let {user} : any = req
  const date = new Date().toISOString().split('T')[0];
  const data = fs.readFileSync('./mock/horoscope.json', { encoding: 'utf-8' });
  const parsed: Record<string, string> = JSON.parse(data);
  let dailyHoroscope = { date, zodiac : user.zodiac, horoscope : parsed[user.zodiac]};
  
  await saveUserHoroscopeHistory({userId:user.userId,...dailyHoroscope})

  res.send(dailyHoroscope)
}


export const getHistoryHoroscopeController = (req : Request | any, res:Response) => {
  const today = new Date();
  let user : user = req.user

  const data = fs.readFileSync('./mock/horoscope_history.json', { encoding: 'utf-8' });
  const horoscopeData: Record<string, { horoscope: string }[]> = JSON.parse(data);

  let dates : string[] = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    dates.push(date.toISOString().slice(0, 10));
  }

  const history = dates.map((date,idx) => ({
    date,
    horoscope: horoscopeData[user.zodiac][idx]?.horoscope
  }));

  let historyData = { zodiac : user.zodiac, history };

  historyData.history.map(async(data)=>{
   await saveUserHoroscopeHistory({
     ...data,userId: user.userId, zodiac: user.zodiac,
   })
  })

  res.send(historyData)
}

export const saveUserHoroscopeHistory = async (historyData: HoroscopeHistoryAttributes) => {
    return await HoroscopeHistory.upsert(historyData);
}

