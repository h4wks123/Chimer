import toaster from "~/components/ui/toaster";
import type { SignInType } from "~/types/signIn";
import type { NavigateFunction } from "react-router";
import type { SignUpType } from "~/types/signUp";

export async function SignIn(
  values: SignInType,
  navigate: NavigateFunction
): Promise<SignInType> {
  console.log(values);
  toaster(200, "Successfully logged in!");
  navigate("/");
  return values;
}

export async function SignUp(
  values: SignUpType,
  navigate: NavigateFunction
): Promise<SignUpType> {
  console.log(values);
  toaster(200, "Successfully created account!");
  navigate("/login");
  return values;
}
