import { findUserByEmail, updateUserByEmail } from "../../services/service.js";
import fs from "fs";
import cloudinary from "../../config/cloudinary.js";
import { asynWrapper } from "../AsyncWrapper/asyncWrapper.js";
import { AppError } from "../../middleware/globalErrorClass.js";

export const updateImage = asynWrapper(async (req, res) => {
    const { email } = req.body;
    if (!req.file) throw new AppError('No File',400)
    //upload to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "avatars",
    });
    //delete the file as os does not clean it immediately , take the space
    fs.unlink(req.file.path, (err) => {
      if (err) console.error("Failed to delete temp file:", err);
    });

    const avatarUrl = result.secure_url; //public url
    const avatarPublicId = result.public_id; //store this to delete later

    //find user and delete old cloud image
    const user = await findUserByEmail(email);
    if (!user) throw new AppError("User not found",404) 

    // If previous avatarPublicId exists, delete that image from Cloudinary
    if (user.avatarPublicId) {
      cloudinary.uploader.destroy(user.avatarPublicId).catch((err) => {
        console.error("Cloudinary delete error:", err);
      });
    }

    // 4) Save new avatarUrl and public_id in DB
    await updateUserByEmail({ email, avatarUrl, avatarPublicId });
    return res.status(200).json({ message: "Uploaded", avatarUrl });
})

