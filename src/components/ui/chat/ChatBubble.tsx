import React from "react";

interface Content {
  className: string;
  message: React.ReactNode;
}

export const ChatBubble: React.FC<Content> = ({ className, message }) => {
  return <div className={`${className} max-w-96 w-max p-2 rounded-tr-xl rounded-tl-xl`}>{message}</div>;
};
