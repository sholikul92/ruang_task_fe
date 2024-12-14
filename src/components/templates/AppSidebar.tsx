import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu } from "@/components/ui/sidebar";
import { useIndexedDb } from "@/hooks/useIndexedDb";
import { CircleX } from "lucide-react";
import { useEffect } from "react";
import React from "react";
import { responseIndexedDB, Chats } from "../model/interface";

interface Props {
  fetchHistory: () => Promise<void>;
  setChats: React.Dispatch<React.SetStateAction<Chats[]>>;
  historyChat: responseIndexedDB[] | null;
}

export const AppSidebar: React.FC<Props> = ({ fetchHistory, setChats, historyChat }) => {
  const { deleteMessage, clearHistory, getDataByKey } = useIndexedDb();

  useEffect(() => {
    fetchHistory();
  }, []);

  // Delete message
  const handleDeleteMessage = async (id: number) => {
    try {
      const res = await deleteMessage(id);
      if (res) {
        await fetchHistory();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Clear all history
  const handleClearHistory = async () => {
    try {
      const res = await clearHistory();
      if (res) {
        await fetchHistory();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchHistoryMessage = async (id: number) => {
    try {
      const res = await getDataByKey(id);

      if (res) {
        const data = res.data;
        setChats(data);
        console.log(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>
              <div className='flex justify-between w-full'>
                <h1 className='text-2xl font-semibold'>History</h1>
                <button onClick={() => handleClearHistory()} className='text-[1.3em] text-red-600 hover:text-red-800'>
                  clear all
                </button>
              </div>
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {historyChat &&
                  historyChat.map((chat) => {
                    if (chat.data.length > 0) {
                      return (
                        <ul key={chat.id} className='mt-4'>
                          <li className='flex justify-between'>
                            <button onClick={() => fetchHistoryMessage(chat.id)}>{chat.data[0].message}</button>
                            <button onClick={() => handleDeleteMessage(chat.id)}>
                              <CircleX className='text-red-700 size-4' />
                            </button>
                          </li>
                          <hr className='mt-2' />
                        </ul>
                      );
                    }
                  })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </>
  );
};
