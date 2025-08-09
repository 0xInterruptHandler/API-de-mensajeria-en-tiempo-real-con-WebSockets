 
import AuthRoutes from './Routes/AuthRutas.js';
 

// app.js
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
 
dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use('/api/auth', AuthRoutes)

app.get('/', (req, res) => {
  res.send('test')
})

export default app
