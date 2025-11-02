import z from "zod";

export const UserValidation = z.object({
  name: z
    .string()
    .trim()
    .min(5, { message: "Name should be at least 5 characters long!" }),
  email: z.string().trim().email({ message: "Invalid email address!" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number" }),
});

export const PasswordValidation = z.object({
  newPassword: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(100, { message: "New password must be less than 100 characters" })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number" }),

  confirmPassword: z.string().min(6, {
    message: "Confirm password must be at least 6 characters long",
  }),
}).refine((data)=>data.newPassword === data.confirmPassword,{
  message:"Password don't match!",
  path:['change-password']
})
