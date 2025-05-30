import { z } from "zod";

const resetSchema = z.object({
    uuid: z.string().uuid("Invalid UUID."),
    email: z.string().email("A valid email must be provided").min(1, "Invalid email."),
    password: z.string().min(8, "The password needs to contain minimum 8 characters."),
    confirmpassword: z.string().min(8, "The confirm password needs to contain minimum 8 characters."),
}).refine((data) => data.password === data.confirmpassword, { message: "The passwords need to match.", path: ["confirmpassword"] })

export default resetSchema