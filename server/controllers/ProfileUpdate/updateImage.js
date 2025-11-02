import { findUserByEmail, updateUserByEmail } from "../../services/service.js";
import fs from "fs";
import cloudinary from "../../config/cloudinary.js";

export const updateImage = async (req, res) => {
  try {
    const { email } = req.body;
    if (!req.file) return res.status(400).json({ message: "No File" });
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
    if (!user) return res.status(404).json({ message: "User not found" });

    // If previous avatarPublicId exists, delete that image from Cloudinary
    if (user.avatarPublicId) {
      cloudinary.uploader.destroy(user.avatarPublicId).catch((err) => {
        console.error("Cloudinary delete error:", err);
      });
    }

    // 4) Save new avatarUrl and public_id in DB
    await updateUserByEmail({ email, avatarUrl, avatarPublicId });
    return res.status(200).json({ message: "Uploaded", avatarUrl });
  } catch (error) {
    console.log("avatar upload error:", error);
    return res.status(500).json({ error: error.message });
  }
};

/* export const updateImage = async (req, res) => {
  try {
    const { email } = req.body;
    //the file is in req.file
    const fileUrl = req.file
      ? `/uploads/avatar/${req.file.filename}`
      : undefined;
    // console.log("data from updateImage", data);

    if (fileUrl) {
      //get old avatar path from db to delete and use space
      const user = await findUserByEmail(email);
      if (user && user.avatarUrl && !user.avatarUrl.startsWith("http")) {
        const oldAvatarPath = path.join("public", user.avatarUrl);
        fs.unlink(oldAvatarPath, (err) => {
          if (err) console.log("Error deleting old avatar:", err);
        });
      }

      await updateUserByEmail({ email, avatarUrl: fileUrl });
      return res.status(200).json({ message: "Image Uploaded Successfully!" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
}; */
