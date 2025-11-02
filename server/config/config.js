import mongoose from 'mongoose'

export const connectDB = async()=>{
        try {
           await mongoose.connect(process.env.DATABASE_URI);
           console.log('Database Connected!')
        } catch (error) {
            console.error(error)
            process.exit(1);
        }
}



