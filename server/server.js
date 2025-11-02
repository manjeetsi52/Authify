import express from "express";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser'
import requestIp from 'request-ip'
import { connectDB } from "./config/config.js";
import { router } from "./routes/route.js";
import cors from 'cors'

dotenv.config();
const app = express();
app.set('view engine','ejs')
app.set("trust proxy", 1);
app.use(cors({
    origin:['http://localhost:5173', 'https://f98163cba279.ngrok-free.app','https://authify-client-19tc.onrender.com'],
    credentials:true,
    methods:['GET,POST,PUT,DELETE,HEAD'],
    allowedHeaders:['Content-Type']
}))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(requestIp.mw())
app.use(cookieParser())
app.use('/',router)



connectDB()
.then(()=>{
    app.listen(process.env.PORT,()=>console.log(`Server is running on port ${process.env.PORT}!`))
})
.catch( (error)=>{console.log(error); process.exit(1)})
