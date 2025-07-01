import { z } from "zod";

const deletePageSchema = z.object({
    key: z.string().min(1, "Invalid key"),
    category: z.string().min(1, "Invalid category")
})

export default deletePageSchema