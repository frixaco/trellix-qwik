import { z } from "@builder.io/qwik-city";

export const SignInSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Please enter your email." })
    .email({ message: "The email address is badly formatted." }),
  password: z
    .string()
    .min(1, { message: "Please enter your password." })
    .min(6, { message: "Your password must have 6 characters or more." }),
});

export type SignInSchema = z.infer<typeof SignInSchema>;
