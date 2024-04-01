import { component$ } from "@builder.io/qwik";
import { Form, routeAction$ } from "@builder.io/qwik-city";
import { useAuthUser, useCreateBoard, useUserBoards } from "./layout";

export const useSignOut = routeAction$(async (_, { cookie, redirect }) => {
  console.log("ACTION: SIGN OUT");

  cookie.delete("auth", {
    path: "/",
  });

  redirect(301, "/signin");
});

export default component$(() => {
  const { value: user } = useAuthUser();
  const { value: boards } = useUserBoards();

  const action = useCreateBoard();
  const signOut = useSignOut();

  return (
    <main class="flex h-full min-h-0 flex-col items-stretch justify-start">
      <div class="flex items-center justify-between px-8 py-4">
        <div class="flex flex-col justify-start">
          <span class="text-2xl font-bold tracking-wide">Trellix</span>
          <span>a Qwik demo</span>
        </div>

        <Form action={signOut}>
          <button
            role="button"
            class="cursor-pointer rounded-lg bg-gray-900 px-8 py-4 text-cyan-400 hover:underline"
          >
            Sign Out
          </button>
        </Form>
      </div>

      <div class="h-full min-h-0 flex-grow bg-cyan-100 p-8 text-lg font-semibold text-gray-800">
        <Form class="flex max-w-md flex-col gap-4" action={action} spaReset>
          <p>Create a New Board</p>

          <div class="flex max-w-md flex-col">
            <label for="boardName" class="text-sm font-normal">
              Name
            </label>
            <input id="boardName" type="text" name="boardName" />
            {action.value?.fieldErrors?.boardName && (
              <span>{action.value.fieldErrors.boardName[0]}</span>
            )}

            <input
              id="userId"
              hidden
              value={user.id}
              type="number"
              name="userId"
            />
          </div>

          <button
            type="submit"
            class="rounded-lg bg-cyan-900 px-6 py-2 text-cyan-50"
            disabled={action.isRunning}
          >
            Create
          </button>
        </Form>

        <div>
          {boards.map((board) => (
            <div key={board.createdAt.toISOString()}>
              <span class="text-black">{board.name}</span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
});
