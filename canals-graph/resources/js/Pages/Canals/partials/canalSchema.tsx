import { z } from "zod";

export const canalSchema = z.object({
    name: z.string().min(3, "Canal name must be at least 3 characters long."),
    clients: z
        .string()
        .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
            message: "Number of clients must be a positive integer.",
        }),
});

export type CanalFormData = z.infer<typeof canalSchema>;
