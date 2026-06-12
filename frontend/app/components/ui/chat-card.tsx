import clsx from "clsx";
import { type Dispatch, type SetStateAction } from "react";

export default function ChatCard({
  cardId,
  user,
  isActive,
  setIsActive,
  setDisplayChat,
}: {
  cardId: string;
  user: User;
  isActive: string | null;
  setIsActive: Dispatch<SetStateAction<string | null>>;
  setDisplayChat: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div
      onClick={() => {
        setIsActive(cardId);
        setDisplayChat(true);
      }}
      className={clsx(
        "px-2 py-4 rounded-sm  cursor-pointer border border-l-4 ",
        cardId == isActive
          ? "border-l-primary border-muted bg-secondary"
          : "border-transparent",
      )}
    >
      <span className="text-default font-semibold">{user.user_name}</span>
    </div>
  );
}
