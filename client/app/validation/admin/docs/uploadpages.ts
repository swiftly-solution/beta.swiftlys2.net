import { z } from "zod";

const uploadPagesSchema = z.object({
    content: z.string(),
    category: z.string().min(1, "Invalid category")
})

export default uploadPagesSchema