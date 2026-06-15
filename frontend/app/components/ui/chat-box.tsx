import { SendHorizonal } from "lucide-react";

export default function ChatBox({
  messageData,
}: {
  messageData: Message | undefined;
}) {
  return (
    <section className="p-6 size-full bg-background/50 flex flex-col justify-between gap-2">
      <div className="h-full overflow-y-auto flex flex-col gap-4 text-default">
        {messageData == null || messageData?.messages.length <= 0 ? (
          <div className="size-full flex justify-center items-center text-center">
            <h3 className="mx-auto text-2xl font-semibold">
              This is the beginning of your legendary conversation with
            </h3>
            <h3>{messageData?.sender_name}</h3>
          </div>
        ) : (
          messageData?.messages.map((message, idx) => (
            <div className="px-4 py-2 bg-secondary rounded-sm">
              {message.message_text}
            </div>
          ))
        )}
      </div>
      <div className="px-4 py-2 bg-secondary rounded-lg flex border border-background">
        <input className="size-full bg-transparent text-default" />
        <button className="p-1 rounded-lg bg-accent border border-primary">
          <SendHorizonal className="size-4 text-primary" />
        </button>
      </div>
    </section>
  );
}
