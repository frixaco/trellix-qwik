import type { RequestHandler } from "@builder.io/qwik-city";

export const onGet: RequestHandler = async ({ cookie, redirect }) => {
  const authCookie = cookie.get("auth");
  if (authCookie) {
    throw redirect(301, "/home");
  }
};
