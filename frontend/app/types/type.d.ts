type User = {
  id: string;
  user_name: string;
  user_email: string;
  user_email_verified: boolean;
  user_profile: string;
  user_created_at: string;
  user_updated_at: string;
};

type Message = {
  sender_name: string;
  messages: {
    id: string;
    user_id: string;
    sender_id: string;
    message_text: string;
    message_created_at: string;
  }[];
};
