import { zodResolver } from "@hookform/resolvers/zod";
import { SendHorizonal } from "lucide-react";
import { useForm } from "react-hook-form";
import { textInputSchema, type TextInputType } from "~/types/text-input";
import { Form, FormControl, FormField, FormItem } from "../shadcn/form";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../shadcn/input-group";
import { SendMessage } from "~/handlers/messages";
import clsx from "clsx";

export default function ChatBox({
  userId,
  messageData,
}: {
  userId: string;
  messageData: Message | undefined;
}) {
  const form = useForm<TextInputType>({
    resolver: zodResolver(textInputSchema),
    defaultValues: {
      userId: "",
      senderId: "",
      input: "",
    },
  });

  return (
    <section className="p-6 size-full bg-background/50 flex flex-col justify-between gap-2">
      <div className="relative h-full overflow-y-auto flex flex-col gap-2 text-default">
        {messageData?.messages == null || messageData?.messages.length <= 0 ? (
          <div className="size-full flex justify-center items-center text-center">
            <h3 className="mx-auto text-2xl font-semibold text-wrap">
              This is the beginning of your legendary conversation with{" "}
              {messageData?.user_name}
            </h3>
          </div>
        ) : (
          messageData?.messages.map((message, idx) => (
            <div
              className={clsx(
                "w-fit px-4 py-2 bg-secondary rounded-sm text-left md:max-w-1/2",
                messageData?.id == message.sender_id ? "ml-auto" : "mr-auto",
              )}
            >
              {message.message_text}
            </div>
          ))
        )}
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(async (values: TextInputType) => {
            values.userId = userId;
            values.senderId = messageData!.id ?? "";
            await SendMessage(values);
            form.reset();
          })}
          className="bg-secondary rounded-lg flex border border-background"
        >
          <FormField
            control={form.control}
            name="input"
            render={({ field }) => (
              <FormItem className="size-full bg-transparent text-default">
                <FormControl>
                  <InputGroup className="h-12 flex">
                    <InputGroupInput
                      type="input"
                      autoComplete="input"
                      placeholder="Aa"
                      {...field}
                    />
                    <InputGroupAddon align={"inline-end"}>
                      <div>
                        <button type="submit">
                          <SendHorizonal className="size-4 text-primary" />
                        </button>
                      </div>
                    </InputGroupAddon>
                  </InputGroup>
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </section>
  );
}
