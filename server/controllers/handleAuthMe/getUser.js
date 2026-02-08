import { AppError } from "../../middleware/globalErrorClass.js";
import { User } from "../../models/user.js";
import { asynWrapper } from "../AsyncWrapper/asyncWrapper.js";

export const getUserAndAuth = asynWrapper(async(req,res)=>{
         if (!req.user) {
          throw new AppError('Not logged in',401)
          }
          console.log('req.user',req.user)
          const user = await User.findById(req.user.id).select('name email avatarUrl');
          console.log('user from auth/me',user)
          const hasPassword = user.password ? true : false
          res.status(200).json({
            message: "Authenticated",
            user: {name:user.name,email:user.email, avatarUrl:user.avatarUrl},
            hasPassword:!hasPassword
          });

})