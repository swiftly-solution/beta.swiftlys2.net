import { z } from "zod";

const forgotPasswordSchema = z.object({
    email: z.string().email("A valid email must be provided").min(1, "Invalid email."),
})

export default forgotPasswordSchema