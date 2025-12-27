import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { signInSchema, type SignInType } from "~/types/signIn";

export default function Login() {
  const form = useForm<SignInType>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <Form {...form}>
      <form className="w-[min(100%,30rem)] relative left-1/2 top-1/2 -translate-1/2 space-y-8 bg-background text-default border border-secondary p-12 rounded-2xl z-50">
        <div className="flex flex-col justify-center items-center gap-2 mb-4">
          <div className="flex gap-2">
            <h1 className="text-3xl font-bold">chimer</h1>
          </div>
          <p className="text-muted text-balance text-lg">
            Login to your WhoDatSenpai account
          </p>
        </div>
      </form>
    </Form>
  );
}
