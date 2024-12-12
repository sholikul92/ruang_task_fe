import React from "react";
import { ChatBubble } from "./ChatBubble";

interface Props {
  message: React.ReactNode;
  type: string;
}

export const Chat: React.FC<Props> = ({ message, type }) => {
  return type === "question" ? (
    <ChatBubble className='bg-primary text-white rounded-bl-xl self-end' message={message} />
  ) : (
    <ChatBubble className='bg-secondary text-black rounded-br-xl' message={message} />
  );
};
