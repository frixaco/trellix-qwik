import type { RequestHandler } from "@builder.io/qwik-city";
import { routeLoader$ } from "@builder.io/qwik-city";
import {
  FormError,
  formAction$,
  valiForm$,
  type InitialValues,
} from "@modular-forms/qwik";
import { SignInSchema } from "~/components/sign-in-form";
import { db } from "~/database/connection";

export const onGet: RequestHandler = async ({ cookie, redirect }) => {
  const authCookie = cookie.get("auth");
  if (authCookie) {
    throw redirect(301, "/home");
  }
};

export const useFormLoader = routeLoader$<InitialValues<SignInSchema>>(() => ({
  email: "",
  password: "",
}));

export const useFormAction = formAction$<SignInSchema>(
  async (values, { redirect, cookie }) => {
    const result = await db.user.findUnique({
      where: values,
    });

    if (result == null) {
      throw new FormError<SignInSchema>({
        email: "User with this email not found",
      });
    }

    cookie.set("auth", result.email, {
      path: "/",
      domain: "localhost",
      expires: new Date(Date.now() + 1000 * 60 * 15),
    });

    redirect(308, "/home");
  },
  valiForm$(SignInSchema),
);
