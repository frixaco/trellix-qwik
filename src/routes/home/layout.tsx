import {
  routeAction$,
  routeLoader$,
  z,
  zod$,
  type RequestHandler,
} from "@builder.io/qwik-city";
import { db } from "~/database/connection";
import { boards, users } from "../../../drizzle/schema";
import { eq } from "drizzle-orm";

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

    // await db.board.create({
    //   data: {
    //     name: boardName,
    //     userId: parseInt(userId, 10),
    //   },
    // });

    const newBoard = await db
      .insert(boards)
      .values({
        name: boardName,
        authorId: parseInt(userId, 10),
      })
      .returning({
        name: boards.name,
        userId: boards.authorId,
      })
      .execute();

    return newBoard;
  },
  zod$({
    boardName: z.string().min(1, "Board name should not be empty."),
    userId: z.string().min(1, "User ID should be provided."),
  }),
);

export const useUserBoards = routeLoader$(async ({ resolveValue }) => {
  console.log("useUserBoards");
  const user = await resolveValue(useAuthUser);

  // const userBoards = await db.board.findMany({
  //   where: {
  //     userId: user.id,
  //   },
  // });
  const userBoards = await db
    .select()
    .from(boards)
    .where(eq(boards.authorId, user.id))
    .execute();

  return userBoards;
});

export const useAuthUser = routeLoader$(async ({ cookie, redirect }) => {
  console.log("useAuthUser");
  const authCookie = cookie.get("auth");

  if (authCookie) {
    // const user = await db.user.findUnique({
    //   where: {
    //     email: authCookie.value,
    //   },
    // });

    const response = await db
      .select()
      .from(users)
      .where(eq(users.email, authCookie.value))
      .execute();
    const user = response[0];

    if (response.length === 0) {
      throw redirect(301, "/signin");
    }

    return {
      id: user.id,
      email: user.email,
    };
  }

  throw redirect(301, "/signin");
});
