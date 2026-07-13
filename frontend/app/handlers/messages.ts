import type { Dispatch, SetStateAction } from "react";
import toaster from "~/components/ui/toaster";
import type { TextInputType } from "~/types/text-input";

export async function FetchMessages(
  userId: string,
  senderId: string,
  setMessageData: Dispatch<SetStateAction<Message | undefined>>,
) {
  const params = {
    senderId: senderId,
    userId: userId,
  };

  const queryString = new URLSearchParams(params).toString();
  const response = await fetch(
    `${import.meta.env.VITE_BETTER_AUTH_URL}/messages?${queryString}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  const data = await response.json();
  setMessageData(data.rows[0]);

  return data.rows;
}
