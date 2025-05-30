import { z } from "zod";

const signupSchema = z.object({
    username: z.string().min(4, "The username needs to have a minimum of 4 characters."),
    email: z.string().email("A valid email must be provided").min(1, "Invalid email."),
    password: z.string().min(8, "The password needs to contain minimum 8 characters."),
    confirmpassword: z.string().min(8, "The confirm password needs to contain minimum 8 characters."),
}).refine((data) => data.password === data.confirmpassword, { message: "The passwords need to match.", path: ["confirmpassword"] })

export default signupSchema