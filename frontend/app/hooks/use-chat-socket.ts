import { useEffect, useRef } from "react";
import toaster from "~/components/ui/toaster";

type ChatSocketEvent =
  | {
      type: "message:created";
      userId: string;
      senderId: string;
    }
  | {
      type: "message:error";
      error: string;
    };

type UseChatSocketArgs = {
  userId: string;
  onMessageCreated: (event: Extract<ChatSocketEvent, { type: "message:created" }>) => void;
};

export function useChatSocket({
  userId,
  onMessageCreated,
}: UseChatSocketArgs) {
  const socketRef = useRef<WebSocket | null>(null);
  const onMessageCreatedRef = useRef(onMessageCreated);
  const hasConnectedRef = useRef(false);

  useEffect(() => {
    onMessageCreatedRef.current = onMessageCreated;
  }, [onMessageCreated]);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:3000");
    socketRef.current = socket;

    socket.onopen = () => {
      hasConnectedRef.current = true;
    };

    socket.onmessage = (event) => {
      let payload: ChatSocketEvent | null = null;

      try {
        payload = JSON.parse(event.data) as ChatSocketEvent;
      } catch {
        return;
      }

      if (payload.type === "message:error") {
        toaster(400, payload.error);
        return;
      }

      if (
        payload.type === "message:created" &&
        (payload.userId === userId || payload.senderId === userId)
      ) {
        onMessageCreatedRef.current(payload);
      }
    };

    socket.onerror = () => {
      if (hasConnectedRef.current) {
        toaster(400, "Chat is no longer connected to the server.");
      }
    };

    socket.onclose = () => {
      if (hasConnectedRef.current) {
        toaster(400, "Chat is no longer connected to the server.");
      }
    };

    return () => {
      hasConnectedRef.current = false;
      socket.close();
      socketRef.current = null;
    };
  }, [userId]);

  return socketRef;
}
