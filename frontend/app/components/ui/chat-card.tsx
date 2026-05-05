import clsx from "clsx";
import { type Dispatch, type SetStateAction } from "react";

export default function ChatCard({
  cardId,
  user,
  isActive,
  setIsActive,
}: {
  cardId: number;
  user: User;
  isActive: number;
  setIsActive: Dispatch<SetStateAction<number>>;
}) {
  return (
    <div
      onClick={() => {
        setIsActive(cardId);
      }}
      className={clsx(
        "px-2 py-4 rounded-sm  cursor-pointer",
        cardId == isActive
          ? "border border-l-4 border-l-primary border-muted bg-secondary"
          : "",
      )}
    >
      <span className="text-default font-semibold">{user.user_name}</span>
    </div>
  );
}
