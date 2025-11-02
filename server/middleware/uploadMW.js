
import multer from "multer";
import path from 'path'
import os from 'os'
const avatarStorage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,os.tmpdir())
    },
    filename:(req,file,cb)=>{
        const ext = path.extname(file.originalname)
        cb(null,`${Date.now()}_${Math.random()*10}${ext}`)
    }
})

const avatarFileFilter = (req,file,cb)=>{
    if(file.mimetype.startsWith('image/')){
        cb(null,true)
    }
    else{
        cb(new Error('only image files are allowed'),false)
    }
}

export const avatarUpload = multer({
    storage:avatarStorage,
    fileFilter:avatarFileFilter,
    limits:{fileSize:5*1024*1024}//5mb
})
