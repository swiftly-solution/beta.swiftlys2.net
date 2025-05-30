import { z } from "zod";

const loginSchema = z.object({
    email: z.string().email("A valid email must be provided").min(1, "Invalid email."),
    password: z.string().min(8, "The password needs to contain minimum 8 characters.")
})

export default loginSchema