import toaster from "~/components/ui/toaster";
import type { SignInType } from "~/types/signIn";
import type { NavigateFunction } from "react-router";
import type { SignUpType } from "~/types/signUp";

export async function SignIn(values: SignInType, navigate: NavigateFunction) {
  console.log(values);
  toaster(200, "Successfully logged in!");
  navigate("/");
}

export async function SignUp(values: SignUpType, navigate: NavigateFunction) {
  console.log(values);
  toaster(200, "Successfully created account!");
  navigate("/login");
}
