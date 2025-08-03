import express,{Express} from 'express' 
import { userRouter } from './routes/user.route'
import { horoscopeRouter } from './routes/horoscope.route'
import { tokenVerification } from './middlewares/auth.middleware'
import { limiter } from './middlewares/rateLimiter'
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });
import config from './config/config'

import { sequelize } from './connection'

import { setupSwagger } from './swagger'


const app : Express = express()

setupSwagger(app);


app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use('/user', userRouter)
app.use('/horoscope',tokenVerification,limiter,horoscopeRouter)


const PORT = process.env.PORT ? process.env.PORT : 8080

async function start() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
}

start();




