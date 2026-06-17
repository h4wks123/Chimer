import type { Route } from "./+types/home";
import {
  ArrowLeftIcon,
  LogOutIcon,
  MessageSquare,
  UserIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { data, useNavigate } from "react-router";
import clsx from "clsx";
import { SignOut } from "~/handlers/entries";
import { userContext } from "~/middleware/context";
import { authMiddleware } from "~/middleware/middleware";
import { useLoaderData } from "react-router";
import ChatCard from "~/components/ui/chat-card";
import ChatBox from "~/components/ui/chat-box";
import { FetchUsers } from "~/handlers/users";
import { FetchMessages } from "~/handlers/messages";

export const clientMiddleware: Route.MiddlewareFunction[] = [authMiddleware];

export async function clientLoader({ context }: Route.ClientLoaderArgs) {
  const userInfo = context.get(userContext);

  return data(userInfo);
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const [mobileView, setMobileView] = useState(false);
  const [displayChat, setDisplayChat] = useState(true);
  const [isActive, setIsActive] = useState<string | null>(null);
  const [userData, setUserData] = useState<User[]>([]);
  const [messageData, setMessageData] = useState<Message>();
  const profileData = useLoaderData();

  const navigate = useNavigate();
  const userInfo = loaderData.data.user;
  const mobileViewport = window.matchMedia("(width <= 768px)");
  const desktopViewport = window.matchMedia("(width > 768px)");

  mobileViewport.addEventListener("change", (e) => {
    if (e.matches) setMobileView(true);
  });

  desktopViewport.addEventListener("change", (e) => {
    if (e.matches) setMobileView(false);
  });

  async function fetchData() {
    const users = await FetchUsers(
      profileData.data.user.id ?? "",
      isActive,
      setIsActive,
      setUserData,
    );

    const senderId = isActive ?? (users && users.length > 0 ? users[0].id : "");

    if (senderId)
      await FetchMessages(
        profileData.data.user.id ?? "",
        senderId,
        setMessageData,
      );
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="flex">
      <section
        className={clsx(
          "h-screen py-6 flex flex-col items-start gap-6 border-r border-secondary",
          mobileView
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
        <nav className="text-default flex flex-wrap px-6 gap-4 items-center font-semibold text-md">
          <div className="border-primary text-primary bg-primary/25 py-1 px-2 rounded-lg border cursor-pointer">
            All
          </div>
          <div className="py-1 px-2 rounded-lg border border-secondary cursor-pointer">
            Unread
          </div>
          <div className="py-1 px-2 rounded-lg border border-secondary cursor-pointer">
            Groups
          </div>
        </nav>
        <div className="h-px w-full bg-secondary" />
        <div className="h-full w-full flex flex-col gap-4 px-6">
          {userData.map((user, idx) => (
            <ChatCard
              key={idx}
              user={user}
              isActive={isActive}
              setIsActive={setIsActive}
              setDisplayChat={setDisplayChat}
            />
          ))}
        </div>
        <div className="h-px w-full bg-secondary" />
        <div className="w-full px-6 flex justify-between items-center">
          <div className="flex items-center rounded-lg p-2 gap-2">
            <div className="p-1 bg-primary/50 rounded-sm border-primary border">
              <UserIcon className="size-6 text-primary" />
            </div>
            <span className="text-default">
              {userInfo.name
                ? userInfo.name.length > 25
                  ? userInfo.name.substring(0, 25) + "..."
                  : userInfo.name
                : "Name not found"}
            </span>
          </div>
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
          mobileView ? (displayChat ? "w-screen" : "hidden") : "w-screen",
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
                mobileView ? "visible" : "hidden",
              )}
            />
            <h1>GC Name</h1>
          </div>
          <h1>Settings</h1>
        </div>
        <ChatBox
          key={profileData.data.user.id}
          userId={profileData.data.user.id ?? ""}
          messageData={messageData}
        />
      </section>
    </main>
  );
}
