import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Link } from "@builder.io/qwik-city";
import { useFormAction, useFormLoader } from "./layout";
import { useForm, valiForm$ } from "@modular-forms/qwik";
import { SignInSchema } from "~/components/sign-in-form";

export default component$(() => {
  const [{ submitting }, { Form, Field }] = useForm<SignInSchema>({
    loader: useFormLoader(),
    action: useFormAction(),
    validate: valiForm$(SignInSchema),
  });

  const { isRunning, submit: handleSubmit, value } = useFormAction();

  return (
    <main class="flex h-full flex-col items-center justify-center bg-cyan-900">
      <div class="flex w-full flex-col items-stretch justify-between gap-8 px-4 text-lg sm:max-w-md sm:px-0">
        <h1 class="text-center text-3xl font-bold tracking-wide text-cyan-50">
          Sign In
        </h1>

        <Form
          onSubmit$={handleSubmit}
          class="flex flex-col items-stretch justify-between gap-4 rounded-lg bg-gray-800 p-10 px-12 drop-shadow-md"
        >
          <Field name="email">
            {(field, props) => (
              <div class="flex flex-col">
                <label for="signin-email" class="pb-1 text-base text-cyan-200">
                  Email
                </label>

                <input
                  {...props}
                  id="signin-email"
                  type="email"
                  class="rounded bg-cyan-800 px-4 py-2 outline-none ring-1 ring-inset focus:ring-2 focus:ring-yellow-300"
                  value={field.value}
                />
                {(field.error || value?.errors.email) && (
                  <div class="text-sm font-semibold text-red-600">
                    {field.error || value?.errors.email}
                  </div>
                )}
              </div>
            )}
          </Field>

          <Field name="password">
            {(field, props) => (
              <div class="flex flex-col pb-4">
                <label
                  for="signin-password"
                  class="pb-1 text-base text-cyan-200"
                >
                  Password
                </label>

                <input
                  {...props}
                  id="signin-password"
                  type="password"
                  class="rounded bg-cyan-800 px-4 py-2 outline-none ring-1 ring-inset focus:ring-2 focus:ring-yellow-300"
                  value={field.value}
                />
                {(field.error || value?.errors.password) && (
                  <div class="text-sm font-semibold text-red-600">
                    {field.error || value?.errors.password}
                  </div>
                )}
              </div>
            )}
          </Field>

          <button
            class="rounded-lg bg-cyan-700 p-4 font-bold tracking-wide text-white outline-none ring-1 ring-inset hover:drop-shadow-md focus:ring-2 focus:ring-yellow-300"
            type="submit"
            disabled={isRunning || submitting}
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
