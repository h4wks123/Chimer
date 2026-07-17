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
import clsx from "clsx";
import { useLayoutEffect, useRef } from "react";
import toaster from "./toaster";

export default function ChatBox({
  userId,
  messageData,
  onSendMessage,
}: {
  userId: string | null;
  messageData: Message | null;
  onSendMessage: (values: TextInputType) => Promise<void> | void;
}) {
  const form = useForm<TextInputType>({
    resolver: zodResolver(textInputSchema),
    defaultValues: {
      userId: "",
      senderId: "",
      input: "",
    },
  });

  const bottomRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    bottomRef.current?.scrollIntoView({ block: "end" });
  }, [messageData?.messages?.length ?? 0]);

  return (
    <section className="size-full overflow-y-auto bg-background/50 flex flex-col justify-between">
      <div className="p-6 relative h-full overflow-y-scroll flex flex-col gap-2 text-default snap-y snap-mandatory">
        {messageData?.id == null ? (
          <div className="size-full flex items-center justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        ) : messageData?.messages == null ? (
          <div className="size-full flex justify-center items-center text-center">
            <h3 className="mx-auto text-2xl font-semibold text-wrap">
              This is the beginning of your legendary conversation with{" "}
              {messageData?.user_name}
            </h3>
          </div>
        ) : (
          messageData?.messages?.map((message) => (
            <div
              key={message.id}
              className={clsx(
                "w-fit px-4 py-2 bg-secondary rounded-sm text-left break-all md:max-w-1/2",
                messageData?.id == message.sender_id ? "ml-auto" : "mr-auto",
              )}
            >
              {message.message_text}
            </div>
          ))
        )}
        <div ref={bottomRef} />
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(async (values: TextInputType) => {
            console.log(values);
            if (values.userId == "" || values.senderId == "") {
              toaster(400, "Cannot send message to a non-existing user.");
              form.reset();
              return;
            }

            values.userId = userId ?? "";
            values.senderId = messageData!.id ?? "";
            await onSendMessage(values);
            form.reset();
          })}
          className="my-2 mx-4 bg-secondary rounded-lg flex border border-background"
        >
          <FormField
            control={form.control}
            name="input"
            render={({ field }) => (
              <FormItem className="size-full bg-transparent">
                <FormControl className="border-0 has-[[data-slot=input-group-control]:focus-visible]:ring-0">
                  <InputGroup className="h-12 flex text-white">
                    <InputGroupInput
                      type="input"
                      autoComplete="input"
                      placeholder="Aa"
                      {...field}
                    />
                    <InputGroupAddon align={"inline-end"}>
                      <button type="submit">
                        <SendHorizonal className="size-4 text-primary block mr-4 cursor-pointer" />
                      </button>
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
