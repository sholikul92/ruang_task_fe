import React, { useRef, useState } from "react";
import { Paperclip, Send, File } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatBubble } from "./components/ui/chat/ChatBubble";
import { Chat } from "./components/ui/chat/Chat";
import axios, { AxiosError } from "axios";
import { PulseLoader } from "react-spinners";

interface Chats {
  type: string;
  message: string;
}

export const App: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [filename, setFilename] = useState<string | null>(null);
  const [query, setQuery] = useState<string>("");
  const [chats, setChats] = useState<Array<Chats>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const handleAttachmentClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFilename(e.target.files[0].name);
    } else {
      setFilename(null);
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query !== "") {
      setChats((prev) => [
        ...prev,
        {
          type: "question",
          message: query,
        },
      ]);
      setLoading(true);
      setQuery("");
      setError(false);
      callApiChat();
    }
  };

  const callApiChat = async () => {
    try {
      const response = await axios.post("http://localhost:8080/chat", { query });
      if (response.status === 200) {
        setChats((prev) => [
          ...prev,
          {
            type: "answer",
            message: response.data.answer,
          },
        ]);
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(true);
        console.log(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex justify-center items-center'>
      <div className='p-4 rounded-xl border-2 h-[90vh] flex flex-col gap-2 min-w-[70vw]'>
        <div>
          <h1 className='font-bold text-4xl'>
            Ruang<span className='text-primary'>Chat</span>
          </h1>
          <hr className='min-w-full border mt-2' />
        </div>
        <ScrollArea className='px-4 flex-1 '>
          <div className='flex flex-col gap-2'>
            {chats && chats.map((chat, index) => <Chat message={chat.message} type={chat.type} key={index} />)}
          </div>
          {loading && <ChatBubble className='bg-secondary text-black rounded-br-xl' message={<PulseLoader size={5} />} />}
          {error && (
            <ChatBubble className='bg-secondary text-black rounded-br-xl' message='Sorry, there is a problem at the moment, please try again 😭' />
          )}
        </ScrollArea>

        <form method='POST' onSubmit={handleForm} className='flex min-w-full max-w-sm items-center space-x-1'>
          <button
            type='button'
            className='flex items-center justify-center w-10 h-10 rounded-full hover:text-gray-600 text-gray-400'
            aria-label='Attach file'
            onClick={handleAttachmentClick}
          >
            <Paperclip className='w-5 h-5' />
          </button>

          <input type='file' ref={fileInputRef} style={{ display: "none" }} aria-label='File input' onChange={handleFileChange} />
          <div className='flex flex-col border p-2 rounded-xl w-full'>
            {filename && (
              <div className='bg-gray-200 flex w-max p-2 mb-4'>
                <File /> {filename}
              </div>
            )}
            <input type='text' placeholder='Input your message...' value={query} className='focus:outline-none' onChange={handleInput} />
          </div>
          <button type='submit' className='rounded-full p-2.5'>
            <Send className='text-primary' />
          </button>
        </form>
      </div>
    </div>
  );
};
