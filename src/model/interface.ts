interface Chats {
  type: string;
  message: React.ReactNode;
}

interface Payload {
  user_id: number;
  chat_id: number;
  data: Chats[];
  created_at: Date;
  updated_at: Date;
}

interface responseIndexedDB {
  id: number;
  user_id: number;
  chat_id: number;
  created_at: Date;
  updated_at: Date;
  data: Array<Chats>;
}

export type { Chats, Payload, responseIndexedDB };
