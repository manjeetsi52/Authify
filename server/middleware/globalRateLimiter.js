import rateLimit from 'express-rate-limit'

export const globalRateLimit = rateLimit({
    windowMs:10*60*1000,
    max:5,
    standardHeaders:true,
    legacyHeaders:false,
    handler:(req,res)=>{
        res.status(429).json({message:'Too many login attempts, please try again after 10 minutes'})
    }
})