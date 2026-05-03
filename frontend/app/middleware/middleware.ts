import { redirect } from "react-router";
import { userContext } from "./context";
import { authClient } from "~/lib/auth-client";
import type { Route } from "../+types/root";

export const authMiddleware = async ({ context }: Route.LoaderArgs) => {
  const user = await authClient.getSession();

  if (!user.data?.session) {
    throw redirect("/login");
  }

  context.set(userContext, user);
};
