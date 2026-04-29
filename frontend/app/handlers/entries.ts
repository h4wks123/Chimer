import toaster from "~/components/ui/toaster";
import type { SignInType } from "~/types/sign-in";
import type { NavigateFunction } from "react-router";
import type { SignUpType } from "~/types/sign-up";
import { authClient } from "~/lib/auth-client";

export async function SignIn(values: SignInType, navigate: NavigateFunction) {
  try {
    const { data, error } = await authClient.signIn.email({
      email: values.email,
      password: values.password,
      rememberMe: true,
    });

    if (error) {
      throw new Error(error.message || "Sign in failed");
    }

    toaster(200, "Successfully logged in!");
    navigate("/");
  } catch (err) {
    toaster(400, "Login failed");
  }
}

export async function GoogleSignIn() {
  try {
    const data = await authClient.signIn.social({
      provider: "google",
      callbackURL: import.meta.env.VITE_WEBSITE_URL,
      errorCallbackURL: import.meta.env.VITE_WEBSITE_URL + "/login",
    });

    if (data.error) {
      throw new Error(data.error.message || "Sign in failed");
    }
  } catch (err) {
    toaster(400, "Login failed");
  }
}

export async function GithubSignIn() {
  try {
    const data = await authClient.signIn.social({
      provider: "github",
      callbackURL: import.meta.env.VITE_WEBSITE_URL,
      errorCallbackURL: import.meta.env.VITE_WEBSITE_URL + "/login",
    });

    if (data.error) {
      throw new Error(data.error.message || "Sign in failed");
    }
  } catch (err) {}
}

export async function SignUp(values: SignUpType, navigate: NavigateFunction) {
  try {
    const { data, error } = await authClient.signUp.email({
      name: values.email,
      email: values.email,
      password: values.password,
    });

    if (error) {
      throw new Error(error.message || "Signup failed");
    }

    toaster(200, "Successfully signed up!");
    navigate("/login");
  } catch (err) {
    toaster(400, "Account registration failed");
  }
}
