import React, { useRef, useState } from "react";
import { CirclePlus, File as FileIcon, Save } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatBubble } from "../components/ui/chat/ChatBubble";
import { Chat } from "../components/ui/chat/Chat";
import { useApi } from "../hooks/useApi";
import { PulseLoader } from "react-spinners";
import { FormInput } from "../components/templates/FormInput";
import { dbConfig } from "../lib/indexedDbConfig";
import { initDB } from "react-indexed-db-hook";
import { useIndexedDb } from "../hooks/useIndexedDb";
import { AppSidebar } from "../components/templates/AppSidebar";
import { SidebarTrigger } from "../components/ui/sidebar";
import { Payload, Chats, responseIndexedDB } from "../model/interface";

initDB(dbConfig);

export const App: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [filename, setFilename] = useState<string | null>(null);
  const [query, setQuery] = useState<string>("");
  const [chats, setChats] = useState<Array<Chats>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const { callApiChat, callApiAnalyzedFile } = useApi({ setChats, setLoading, setError, file, query });
  const { saveMessage } = useIndexedDb();
  const [historyChat, setHistoryChat] = useState<responseIndexedDB[] | null>(null);
  const { getAllData } = useIndexedDb();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setFilename(e.target.files[0].name);
    } else {
      setFile(null);
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuery(e.target.value);

    const textarea = textAreaRef.current;
    if (textarea) {
      textarea.style.height = "auto";

      const maxRow = 5;
      const rowHeight = 24;
      const maxHeight = maxRow * rowHeight;

      textarea.style.height = `${Math.min(textarea.scrollHeight, maxHeight)}px`;
    }
  };

  const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query) {
      if (file) {
        callApiAnalyzedFile();
        setChats((prev) => [
          ...prev,
          {
            type: "question",
            message: (
              <p>
                <FileIcon />
                {file.name}
              </p>
            ),
          },
        ]);
      } else {
        callApiChat();
      }

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
      setFile(null);
    }
  };

  const fetchHistory = async () => {
    try {
      const res = await getAllData();
      if (res) {
        setHistoryChat(res);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleButtonSave = async () => {
    setChats(
      chats.map((chat) => {
        if (typeof chat.message === "object") {
          chat.message = filename;
        }

        return chat;
      })
    );

    const payload: Payload = {
      user_id: 1,
      chat_id: 1,
      data: chats,
      created_at: new Date(),
      updated_at: new Date(),
    };

    try {
      if (chats.length > 0) {
        await saveMessage(payload);
      }
      fetchHistory();
    } catch (err) {
      console.log(err);
    }
  };

  const newChats = () => {
    setChats([]);
  };

  return (
    <>
      <SidebarTrigger />
      <AppSidebar setChats={setChats} historyChat={historyChat} fetchHistory={fetchHistory} />
      <div className='rounded-xl h-[95vh] flex flex-col gap-2 min-w-[70vw] w-full mr-6 mt-4'>
        <div className='flex items-center '>
          <button onClick={newChats}>
            <CirclePlus className='size-6' />
          </button>
          <div className='flex justify-center items-center flex-1 '>
            <h1 className='font-bold text-2xl md:text-4xl '>
              Ruang<span className='text-primary'>Chat</span>
            </h1>
            <img src='logo.svg' className='w-8 md:w-12' />
          </div>
          <button onClick={handleButtonSave}>
            <Save className='text-primary size-6 md:size-8' />
          </button>
        </div>
        <div className='flex flex-col flex-1 md:w-[60%] self-center h-[90%] '>
          <ScrollArea className='px-4 flex-1'>
            <div className='flex flex-col gap-2'>
              {chats && chats.map((chat, index) => <Chat message={chat.message} type={chat.type} key={index} />)}
            </div>
            {loading && <ChatBubble className='bg-secondary text-black rounded-br-xl' message={<PulseLoader size={5} />} />}
            {error && (
              <ChatBubble
                className='bg-secondary text-black rounded-br-xl mt-2'
                message='Sorry, there is a problem at the moment, please try again 😭'
              />
            )}
          </ScrollArea>
          <FormInput
            handleForm={handleForm}
            handleFileChange={handleFileChange}
            handleInput={handleInput}
            setFile={setFile}
            file={file}
            query={query}
          />
        </div>
      </div>
    </>
  );
};
