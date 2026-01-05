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
import { signInSchema, type SignInType } from "~/types/signIn";
import { Link } from "react-router";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "~/components/shadcn/input-group";
import { SignIn } from "~/handlers/entries";
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
          const data = await SignIn(values, navigate);
          if (data) form.reset();
        })}
        className="w-[min(100%,30rem)] relative left-1/2 top-1/2 -translate-1/2 space-y-8 bg-background text-default border border-secondary p-12 rounded-2xl z-50"
      >
        <div className="flex flex-col justify-center mb-4">
          <div className="flex flex-col gap-1 mb-6">
            <div className="flex gap-3 mx-auto justify-center items-center">
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
              <FormItem className="flex flex-col gap-3 mb-3">
                <FormLabel className="text-muted text-md">IDENTITY</FormLabel>
                <FormControl>
                  <InputGroup className="h-12 flex rounded-lg border-2 border-secondary">
                    <InputGroupInput
                      type="email"
                      autoComplete="email"
                      placeholder="user@chimer.net"
                      className="bg-background"
                      {...field}
                    />
                    <InputGroupAddon>
                      <AtSign className="size-4 text-muted" />
                    </InputGroupAddon>
                  </InputGroup>
                </FormControl>
                <div className="sm:h-4">
                  <FormMessage className="text-error" />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-3 mb-3">
                <FormLabel className="text-muted text-md">PASSCODE</FormLabel>
                <FormControl>
                  <InputGroup className="h-12 flex rounded-lg border-2 border-secondary">
                    <InputGroupInput
                      type="password"
                      autoComplete="password"
                      placeholder="*****************"
                      className="bg-background"
                      {...field}
                    />
                    <InputGroupAddon>
                      <LockIcon className="size-4 text-muted" />
                    </InputGroupAddon>
                  </InputGroup>
                </FormControl>
                <div className="sm:h-4">
                  <FormMessage className="text-error" />
                </div>
              </FormItem>
            )}
          />
          <button
            type="submit"
            className="h-12 w-full mb-6 flex justify-center items-center rounded-lg gap-1 border-2 border-accent hover:border-primary cursor-pointer"
          >
            <h6 className="text-default text-md">INITIATE SESSION</h6>
            <ArrowRight className="size-4" />
          </button>
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
