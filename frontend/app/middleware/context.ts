import { createContext } from "react-router";
import type { authClient } from "~/lib/auth-client";

type userSessionType = ReturnType<typeof authClient.getSession>;

export const userContext = createContext<userSessionType | null>(null);
