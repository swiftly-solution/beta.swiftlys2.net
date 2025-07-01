import { z } from "zod";

const createPageSchema = z.object({
    key: z.string().min(1, "Invalid key"),
    title: z.string().min(1, "Invalid title"),
    icon: z.string().optional(),
    category: z.string().min(1, "Invalid category")
})

export default createPageSchema