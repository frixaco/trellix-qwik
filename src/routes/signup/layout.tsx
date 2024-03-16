import type { RequestHandler } from "@builder.io/qwik-city";
import { routeLoader$ } from "@builder.io/qwik-city";
import {
  formAction$,
  valiForm$,
  type InitialValues,
} from "@modular-forms/qwik";
import { SignUpSchema } from "~/components/sign-up-form";
import { db } from "~/database/connection";

export const onGet: RequestHandler = async ({ cookie, redirect }) => {
  const authCookie = cookie.get("auth");
  if (authCookie) {
    throw redirect(301, "/home");
  }
};

export const useFormLoader = routeLoader$<InitialValues<SignUpSchema>>(() => ({
  email: "",
  password: "",
}));

export const useFormAction = formAction$<SignUpSchema>(
  async (values, { redirect, cookie }) => {
    const result = await db.user.create({
      data: values,
    });

    cookie.set("auth", result.email, {
      path: "/",
      domain: "localhost",
      expires: new Date(Date.now() + 1000 * 60 * 15),
    });

    redirect(308, "/home");
  },
  valiForm$(SignUpSchema),
);
