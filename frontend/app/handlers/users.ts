import type { Dispatch, SetStateAction } from "react";

export async function FetchUsers(
  userId: string,
  isActive: string | null,
  setIsActive: Dispatch<SetStateAction<string | null>>,
  setUserData: Dispatch<SetStateAction<User[]>>,
) {
  const params = {
    userId: userId,
  };

  const queryString = new URLSearchParams(params).toString();
  const response = await fetch(
    `${import.meta.env.VITE_BETTER_AUTH_URL}/users?${queryString}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  const data = await response.json();

  if (data.rows.length > 0 && !isActive) setIsActive(data.rows[0].id);

  setUserData(data.rows);

  return data.rows;
}
