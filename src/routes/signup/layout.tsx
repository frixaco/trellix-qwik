import type { RequestHandler } from "@builder.io/qwik-city";
import { routeAction$, zod$ } from "@builder.io/qwik-city";
import { SignUpSchema } from "~/components/sign-up-form";
import { db } from "~/database/connection";
import { users } from "../../../drizzle/schema";
import { eq } from "drizzle-orm";

export const onGet: RequestHandler = async ({ cookie, redirect }) => {
  const authCookie = cookie.get("auth");
  if (authCookie) {
    throw redirect(301, "/home");
  }
};

export const useSignUpAction = routeAction$(
  async (values, { redirect, cookie }) => {
    // const result = await db.user.create({
    //   data: values,
    // });
    const response = await db
      .select({
        email: users.email,
        password: users.password,
      })
      .from(users)
      .where(eq(users.email, values.email))
      .execute();
    const result = response[0];

    cookie.set("auth", result.email, {
      path: "/",
      domain: "localhost",
      expires: new Date(Date.now() + 1000 * 60 * 15),
    });

    redirect(308, "/home");
  },
  zod$(SignUpSchema),
);
