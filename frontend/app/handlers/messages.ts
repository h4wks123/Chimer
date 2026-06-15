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
    `http://localhost:3000/messages?${queryString}`,
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

export async function SendMessage(values: TextInputType) {
  try {
    const response = await fetch(`http://localhost:3000/messages/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

  } catch (e) {}
}
