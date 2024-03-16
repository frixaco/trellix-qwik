import { email, type Input, minLength, object, string } from "valibot";

export const SignUpSchema = object({
  email: string([
    minLength(1, "Please enter your email."),
    email("The email address is badly formatted."),
  ]),
  password: string([
    minLength(1, "Please enter your password."),
    minLength(8, "Your password must have 8 characters or more."),
  ]),
});

export type SignUpSchema = Input<typeof SignUpSchema>;
