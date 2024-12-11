import React from "react";

interface Props {
  message: string;
  type: string;
}

export const ChatBubble: React.FC<Props> = ({ message, type }) => {
  return type === "question" ? (
    <div className='bg-primary max-w-96 w-max p-2 text-white rounded-tr-xl rounded-tl-xl rounded-bl-xl self-end'>{message}</div>
  ) : (
    <div className='bg-secondary max-w-96 w-max p-2 text-black rounded-tr-xl rounded-tl-xl rounded-br-xl '>{message}</div>
  );
};
