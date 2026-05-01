import type { Route } from "./+types/home";
import { ArrowLeftIcon, MessageSquare, UserIcon } from "lucide-react";
import { useState } from "react";
import clsx from "clsx";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const [mobileView, setMobileView] = useState(false);
  const [displayChat, setDisplayChat] = useState(true);

  const mobileViewport = window.matchMedia("(width <= 800px)");
  const desktopViewport = window.matchMedia("(width > 800px)");

  mobileViewport.addEventListener("change", (e) => {
    if (e.matches) setMobileView(true);
  });

  desktopViewport.addEventListener("change", (e) => {
    if (e.matches) setMobileView(false);
  });

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
        <div className="h-full w-full"></div>
        <div className="h-px w-full bg-secondary" />
        <div className="px-6 flex justify-between items-center">
          <div className="flex justify-center items-center rounded-lg p-2">
            <UserIcon className="size-6 text-primary" />
          </div>
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
      </section>
    </main>
  );
}
