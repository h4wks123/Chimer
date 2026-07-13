import type { Route } from "./+types/home";
import {
  ArrowLeftIcon,
  LogOutIcon,
  MessageSquare,
  UserIcon,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { data, useNavigate } from "react-router";
import clsx from "clsx";
import { SignOut } from "~/handlers/entries";
import { userContext } from "~/middleware/context";
import { authMiddleware } from "~/middleware/middleware";
import ChatCard from "~/components/ui/chat-card";
import ChatBox from "~/components/ui/chat-box";
import { FetchUsers } from "~/handlers/users";
import { FetchMessages } from "~/handlers/messages";
import { useMediaQuery } from "~/hooks/use-media-query";
import { useChatSocket } from "~/hooks/use-chat-socket";
import { map } from "zod";

export const clientMiddleware: Route.MiddlewareFunction[] = [authMiddleware];

export async function clientLoader({ context }: Route.ClientLoaderArgs) {
  const userInfo = context.get(userContext);

  return data(userInfo);
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const navigate = useNavigate();
  const userInfo = loaderData.data.user;
  const isMobileView = useMediaQuery("(width <= 768px)");

  const [displayChat, setDisplayChat] = useState(true);
  const [isActive, setIsActive] = useState<string | null>(null);
  const [userData, setUserData] = useState<User[]>([]);
  const [messageData, setMessageData] = useState<Message>();
  const [isUsersLoading, setIsUsersLoading] = useState(true);

  const refreshUsers = useCallback(async () => {
    setIsUsersLoading(true);
    try {
      await FetchUsers(userInfo.id ?? "", isActive, setIsActive, setUserData);
    } finally {
      setIsUsersLoading(false);
    }
  }, [isActive, userInfo.id]);

  const refreshMessages = useCallback(
    async (conversationId: string | null) => {
      if (!conversationId) {
        setMessageData(undefined);
        return;
      }
      await FetchMessages(userInfo.id ?? "", conversationId, setMessageData);
    },
    [userInfo.id],
  );

  const handleMessageCreated = useCallback(
    async (event: { userId: string; senderId: string }) => {
      await refreshUsers();

      const currentConversationId =
        event.userId === userInfo.id ? event.senderId : event.userId;

      if (currentConversationId === isActive) {
        await refreshMessages(currentConversationId);
      }
    },
    [isActive, refreshMessages, refreshUsers, userInfo.id],
  );

  const socketRef = useChatSocket({
    userId: userInfo.id ?? "",
    onMessageCreated: handleMessageCreated,
  });

  useEffect(() => {
    refreshUsers();
  }, [refreshUsers]);

  useEffect(() => {
    refreshMessages(isActive);
  }, [isActive, refreshMessages]);

  const handleSendMessage = useCallback(
    async (values: { userId: string; senderId: string; input: string }) => {
      socketRef.current?.send(JSON.stringify(values));
    },
    [socketRef],
  );

  return (
    <main className="flex">
      <section
        className={clsx(
          "h-screen py-6 flex flex-col items-start gap-6 border-r border-secondary",
          isMobileView
            ? displayChat
              ? "hidden"
              : "w-screen"
            : "w-full max-w-[350px]",
        )}
      >
        <div className="flex gap-4 px-6 justify-center items-center">
          <div className="flex justify-center items-center bg-secondary border-2 border-primary/50 rounded-lg p-2">
            <MessageSquare className="size-6 text-primary" />
          </div>
          <div className="flex gap-1 items-end">
            <h1 className="text-default text-3xl font-bold leading-none">
              chimer
            </h1>
            <div className="bg-primary size-2.5 rounded-full mb-0.5" />
          </div>
        </div>
        <div className="h-px w-full bg-secondary" />
        <div className="h-full w-full overflow-y-auto flex flex-col gap-4 px-6">
          {userData.length > 0
            ? userData.map((user) => (
                <ChatCard
                  key={user.id}
                  user={user}
                  isActive={isActive}
                  setIsActive={setIsActive}
                  setDisplayChat={setDisplayChat}
                />
              ))
            : Array.from({ length: 10 }).map((_, index) => (
                <div
                  key={index}
                  className="ml-auto min-h-10 w-full rounded-sm bg-secondary animate-pulse"
                />
              ))}
        </div>
        <div className="h-px w-full bg-secondary" />
        <div className="w-full px-6 flex justify-between items-center">
          {isUsersLoading ? (
            <div className="flex items-center rounded-lg p-2 gap-2 w-full">
              <div className="size-8 rounded-sm bg-secondary/80 animate-pulse" />
              <div className="h-4 w-36 rounded-full bg-secondary/80 animate-pulse" />
            </div>
          ) : (
            <div className="flex items-center rounded-lg p-2 gap-2">
              <div className="p-1 bg-primary/50 rounded-sm border-primary border">
                <UserIcon className="size-6 text-primary" />
              </div>
              <span className="text-default font-semibold">
                {userInfo.name
                  ? userInfo.name.length > 25
                    ? `${userInfo.name.substring(0, 25)}...`
                    : userInfo.name
                  : "Name not found"}
              </span>
            </div>
          )}
          <LogOutIcon
            onClick={() => {
              SignOut(navigate);
            }}
            className="size-6 text-primary cursor-pointer"
          />
        </div>
      </section>
      <section
        className={clsx(
          "h-screen bg-secondary/50 flex flex-col",
          isMobileView ? (displayChat ? "w-screen" : "hidden") : "w-screen",
        )}
      >
        <div className="px-6 py-6 text-default border-b-secondary bg-background flex flex-wrap justify-between items-center gap-4 border-b">
          <div className="flex gap-2 items-center">
            <ArrowLeftIcon
              onClick={() => {
                setDisplayChat(false);
              }}
              className={clsx(
                "size-4 text-muted hover:text-primary cursor-pointer",
                isMobileView ? "visible" : "hidden",
              )}
            />
            <h1 className="font-semibold text-default">
              {messageData?.user_name ?? ""}
            </h1>
          </div>
        </div>
        <ChatBox
          key={userInfo.id}
          userId={userInfo.id ?? ""}
          messageData={messageData}
          onSendMessage={handleSendMessage}
        />
      </section>
    </main>
  );
}
