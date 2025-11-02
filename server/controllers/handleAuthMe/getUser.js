import { User } from "../../models/user.js";

export const getUserAndAuth = async(req,res)=>{
    try {
         if (!req.user) {
            return res.status(401).json({ message: "Not logged in" });
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
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}