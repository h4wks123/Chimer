type User = {
  id: string;
  user_name: string;
  user_email: string;
  user_email_verified: boolean;
  user_profile: string;
  user_created_at: string;
  user_updated_at: string;
};

type Chat = {
  id: string;
  chat_name: string;
  chat_created_at: string;
};

type Message = {
  id: string;
  user_id: string;
  chat_id: string;
  message_text: string;
  message_created_at: string;
};
