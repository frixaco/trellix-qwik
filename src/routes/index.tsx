import { component$ } from "@builder.io/qwik";
import { Link, type DocumentHead } from "@builder.io/qwik-city";
import { GithubLogo } from "~/components/github-logo";
import { QwikLogo } from "~/components/qwik-logo";

export default component$(() => {
  return (
    <main class="flex h-screen flex-col items-center justify-center">
      <div class="flex flex-col gap-8 px-4 text-lg sm:max-w-md sm:px-0">
        <GithubLogo />

        <div class="relative flex flex-col justify-between gap-4 text-left">
          <QwikLogo />

          <p>
            Demo app to explore Qwik features. Inspired by{" "}
            <a
              target="_blank"
              class="underline"
              href="https://x.com/@ryanflorence"
            >
              Ryan Florence's
            </a>{" "}
            Trellix{" "}
            <a
              target="_blank"
              class="underline"
              href="https://trellix.fly.dev/"
            >
              demo app
            </a>{" "}
            and his videos on{" "}
            <a
              target="_blank"
              class="underline"
              href="https://www.youtube.com/watch?v=RTHzZVbTl6c&list=PLXoynULbYuED9b2k5LS44v9TQjfXifwNu&pp=gAQBiAQB"
            >
              YouTube
            </a>
            .
          </p>

          <p>
            It's a recreation of the popular drag and drop interface in{" "}
            <a target="_blank" href="trello.com">
              Trello
            </a>{" "}
            and other similar apps.
          </p>

          <p>To get started, either sign up with any email or sign in:</p>
        </div>

        <div class="grid grid-cols-1 place-items-stretch gap-4 text-lg font-bold sm:grid-cols-2">
          <Link
            class="cursor-pointer rounded-lg bg-gray-900 p-8 text-center tracking-wide text-cyan-400 hover:underline"
            prefetch
            role="button"
            href="/signup"
          >
            Sign Up
          </Link>

          <Link
            class="cursor-pointer rounded-lg bg-gray-900 p-8 text-center tracking-wide text-cyan-400 hover:underline"
            prefetch
            role="button"
            href="/signin"
          >
            Sign In
          </Link>
        </div>
      </div>
    </main>
  );
});

export const head: DocumentHead = {
  title: "Qwik Demo",
  meta: [
    {
      name: "description",
      content: "Trellix clone made with Qwik by @frixaco",
    },
  ],
};
