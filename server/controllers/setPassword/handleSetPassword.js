import { AppError } from "../../middleware/globalErrorClass.js";
import { User } from "../../models/user.js";
import { findUserByEmail, hashPassword } from "../../services/service.js";
import { PasswordValidation } from "../../validations/zod-validation/validator.js";
import { asynWrapper } from "../AsyncWrapper/asyncWrapper.js";

export const setPassword = asynWrapper(async (req, res) => {
    const result = PasswordValidation.safeParse(req.body);
    console.log('result data',result.data)
    if (!result.success) throw result.error 

    if(result.success){
        const { newPassword } = result.data;
        const {email} = req.body
        console.log('email from setPassword',email)
        const user = await findUserByEmail(email)
        if(!user) throw new AppError('User Not Found',404)
        
        const hashedPassword = await hashPassword(newPassword)
        await User.updateOne({_id:user._id},{$set:{password:hashedPassword}})
        return res.status(200).json({message:'Password Set Successfully!'})
    }

})
