import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Form, Link } from "@builder.io/qwik-city";
import { routeAction$, zod$ } from "@builder.io/qwik-city";
import { SignInSchema } from "~/components/sign-in-form";
import { db } from "~/database/connection";
import { users } from "../../../drizzle/schema";
import { eq } from "drizzle-orm";

export const useSignInAction = routeAction$(
  async (values, { redirect, cookie, fail }) => {
    // const result = await db.user.findUnique({
    //   where: values,
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

    if (response.length === 0) {
      fail(401, {
        message: "Invalid email or password",
      });
      return;
    }

    cookie.set("auth", result.email, {
      path: "/",
      domain: "localhost",
      expires: new Date(Date.now() + 1000 * 60 * 15),
    });

    redirect(308, "/home");
  },
  zod$(SignInSchema),
);

export default component$(() => {
  const action = useSignInAction();

  return (
    <main class="flex h-full flex-col items-center justify-center bg-cyan-900">
      <div class="flex w-full flex-col items-stretch justify-between gap-8 px-4 text-lg sm:max-w-md sm:px-0">
        <h1 class="text-center text-3xl font-bold tracking-wide text-cyan-50">
          Sign In
        </h1>

        <Form
          action={action}
          class="flex flex-col items-stretch justify-between gap-4 rounded-lg bg-gray-800 p-10 px-12 drop-shadow-md"
        >
          <div class="flex flex-col">
            <label for="signin-email" class="pb-1 text-base text-cyan-200">
              Email
            </label>

            <input
              id="signin-email"
              type="email"
              class="rounded bg-cyan-800 px-4 py-2 outline-none ring-1 ring-inset focus:ring-2 focus:ring-yellow-300"
            />
            <div class="text-sm font-semibold text-red-600">
              {action.value?.failed && <p>{action.value.fieldErrors.email}</p>}
            </div>
          </div>

          <div class="flex flex-col pb-4">
            <label for="signin-password" class="pb-1 text-base text-cyan-200">
              Password
            </label>

            <input
              id="signin-password"
              type="password"
              class="rounded bg-cyan-800 px-4 py-2 outline-none ring-1 ring-inset focus:ring-2 focus:ring-yellow-300"
            />
            <div class="text-sm font-semibold text-red-600">
              {action.value?.failed && (
                <p>{action.value.fieldErrors.password}</p>
              )}
            </div>
          </div>

          <button
            class="rounded-lg bg-cyan-700 p-4 font-bold tracking-wide text-white outline-none ring-1 ring-inset hover:drop-shadow-md focus:ring-2 focus:ring-yellow-300"
            type="submit"
            disabled={action.isRunning}
          >
            Sign In
          </button>

          <p class="pt-4 text-base">
            Don't have an account?{" "}
            <Link
              class="rounded px-2 underline outline-none ring-0 ring-inset focus:ring-2 focus:ring-yellow-300"
              href="/signup"
            >
              Sign Up
            </Link>
          </p>
        </Form>
      </div>
    </main>
  );
});

export const head: DocumentHead = {
  title: "Sign In | Qwik Demo",
  meta: [
    {
      name: "description",
      content: "Sign in using any email address",
    },
  ],
};
