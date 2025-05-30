import z from "zod";

export default function ValidateEmail(email: string) {
    return z.string().email().safeParse(email).success
}