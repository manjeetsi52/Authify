import { User } from "../../models/user.js";
import { findUserByEmail, hashPassword } from "../../services/service.js";
import { PasswordValidation } from "../../validations/zod-validation/validator.js";

export const setPassword = async (req, res) => {
  try {
    const result = PasswordValidation.safeParse(req.body);
    console.log('result data',result.data)
    if (!result.success) {
      return res
        .status(400)
        .json({ message: result.error.issues.map((err) => err.message) });
    }
    if(result.success){
        const { newPassword } = result.data;
        const {email} = req.body
        console.log('email from setPassword',email)
        const user = await findUserByEmail(email)
        if(!user) return res.status(400).json({message:'User Not Found'})
        
        const hashedPassword = await hashPassword(newPassword)
        await User.updateOne({_id:user._id},{$set:{password:hashedPassword}})
        return res.status(200).json({message:'Password Set Successfully!'})
    }

  } catch (error) {
    return res.status(500).json({message:error.message})
  }
};
