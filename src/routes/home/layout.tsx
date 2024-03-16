import {
  routeAction$,
  routeLoader$,
  z,
  zod$,
  type RequestHandler,
} from "@builder.io/qwik-city";
import { db } from "~/database/connection";

export const onRequest: RequestHandler = async ({
  next,
  url,
  cookie,
  redirect,
}) => {
  const authCookie = cookie.get("auth");

  if (authCookie) {
    return await next();
  }

  throw redirect(301, new URL("/signin", url).toString());
};

export const useCreateBoard = routeAction$(
  async (form) => {
    console.log("useCreateBoard", form);
    const { boardName, userId } = form;

    await db.board.create({
      data: {
        name: boardName,
        userId: parseInt(userId, 10),
      },
    });
  },
  zod$({
    boardName: z.string().min(1, "Board name should not be empty."),
    userId: z.string().min(1, "User ID should be provided."),
  }),
);

export const useUserBoards = routeLoader$(async ({ resolveValue }) => {
  console.log("useUserBoards");
  const user = await resolveValue(useAuthUser);

  const userBoards = await db.board.findMany({
    where: {
      userId: user.id,
    },
  });

  return userBoards;
});

export const useAuthUser = routeLoader$(async ({ cookie, redirect }) => {
  console.log("useAuthUser");
  const authCookie = cookie.get("auth");

  if (authCookie) {
    const user = await db.user.findUnique({
      where: {
        email: authCookie.value,
      },
    });

    if (user == null) {
      throw redirect(301, "/signin");
    }

    return {
      id: user.id,
      email: user.email,
    };
  }

  throw redirect(301, "/signin");
});
