import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { MessageSquare, ArrowRight, AtSign, LockIcon } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/shadcn/form";
import { signInSchema, type SignInType } from "~/types/sign-in";
import { Link } from "react-router";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "~/components/shadcn/input-group";
import { GithubSignIn, GoogleSignIn, SignIn } from "~/handlers/entries";
import { useNavigate } from "react-router";

export default function Login() {
  const form = useForm<SignInType>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(async (values: SignInType) => {
          await SignIn(values, navigate);
          form.reset();
        })}
        className="w-[min(100%,30rem)] relative left-1/2 top-1/2 -translate-1/2 space-y-8 bg-background text-default border border-secondary p-12 rounded-2xl z-50"
      >
        <div className="flex flex-col justify-center gap-4">
          <div className="flex flex-col gap-1 mb-6">
            <div className="flex gap-4 mx-auto justify-center items-center">
              <div className="flex justify-center items-center bg-background border-2 border-primary/50 rounded-lg p-2">
                <MessageSquare className="size-6 text-primary" />
              </div>
              <div className="flex gap-1 items-end">
                <h1 className="text-3xl font-bold leading-none">chimer</h1>
                <div className="bg-primary size-2.5 rounded-full mb-0.5" />
              </div>
            </div>
            <h6 className="text-muted text-balance text-lg text-center">
              INITIATE_CONNECTION_PROTOCOL
            </h6>
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-4">
                <FormLabel className="text-muted text-md">IDENTITY</FormLabel>
                <FormControl>
                  <InputGroup className="flex rounded-lg border-2 border-secondary">
                    <InputGroupInput
                      type="email"
                      autoComplete="email"
                      placeholder="user@chimer.net"
                      {...field}
                    />
                    <InputGroupAddon>
                      <AtSign className="size-4 text-muted" />
                    </InputGroupAddon>
                  </InputGroup>
                </FormControl>
                <FormMessage className="text-error" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-4">
                <FormLabel className="text-muted text-md">PASSCODE</FormLabel>
                <FormControl>
                  <InputGroup className="flex rounded-lg border-2 border-secondary">
                    <InputGroupInput
                      type="password"
                      autoComplete="password"
                      placeholder="*****************"
                      {...field}
                    />
                    <InputGroupAddon>
                      <LockIcon className="size-4 text-muted" />
                    </InputGroupAddon>
                  </InputGroup>
                </FormControl>
                <FormMessage className="text-error" />
              </FormItem>
            )}
          />
          <button
            type="submit"
            className="bg-black h-12 w-full flex justify-center items-center rounded-lg gap-1 border-2 border-accent hover:border-primary cursor-pointer"
          >
            <h6 className="text-default text-md">INITIATE SESSION</h6>
            <ArrowRight className="size-4" />
          </button>
          <div className="w-full gap-3 flex justify-center items-center">
            <div className="bg-muted h-px w-full" />
            <p className="text-nowrap text-muted text-md">OR CONNECT VIA</p>
            <div className="bg-muted h-px w-full" />
          </div>
          <div className="flex flex-wrap sm:flex-nowrap justify-between items-center gap-4">
            <button
              type="button"
              onClick={() => GoogleSignIn()}
              className="w-full text-muted hover:text-white bg-black border-muted hover:border-white flex justify-center items-center p-3 rounded-lg border cursor-pointer"
            >
              <p className="text-md font-semibold">GOOGLE</p>
            </button>
            <button
              type="button"
              onClick={() => GithubSignIn()}
              className="w-full text-muted hover:text-white bg-black border-muted hover:border-white flex justify-center items-center p-3 rounded-lg border cursor-pointer"
            >
              <p className="text-md font-semibold">GITHUB</p>
            </button>
          </div>
          <div className="flex gap-2 mx-auto">
            <p className="text-muted text-md">New to chimer? </p>
            <Link to="/register" className="text-primary hover:underline">
              Create Account
            </Link>
          </div>
        </div>
      </form>
    </Form>
  );
}
