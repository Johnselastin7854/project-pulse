import { z } from "zod";

export const organizationRegisterSchema = z.object({
  name: z
    .string({
      required_error: "Organization Name is required",
    })
    .min(4, "Organization Name is required")
    .max(50, "Organization Name Maximum 50 characters"),
  description: z
    .string({
      required_error: "Description is required",
    })
    .min(10, "Description is required")
    .max(250, "Organization Name Maximum 50 characters"),
  file: z
    .custom<File>((value) => value instanceof File, {
      message: "Please upload a valid file",
    })
    .refine(
      (file) => file?.type === "image/jpeg" || file?.type === "image/png",
      {
        message: "Only PNG and JPEG files are allowed",
      }
    ),
  email: z
    .string()
    .email("Invalid email address")
    .nonempty("Email is required"),
  password: z
    .string()
    .nonempty("Password is required")
    .min(8, "Password must be at least 8 chracters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[@$!%*?&]/,
      "Password must contain at least one special character (@, $, !, %, *, ?, &)"
    ),
});
