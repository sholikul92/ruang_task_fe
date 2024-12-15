import { useIndexedDB } from "react-indexed-db-hook";
import { responseIndexedDB, Payload } from "@/model/interface";

export const useIndexedDb = () => {
  const db = useIndexedDB("chats");
  const getDataByKey = async (id: number): Promise<responseIndexedDB | null> => {
    try {
      const response = await db.getByID(id);
      const data = response as responseIndexedDB;

      return data;
    } catch (error) {
      console.error("Error fetching data from IndexedDB:", error);
      return null;
    }
  };

  const getAllData = async (): Promise<responseIndexedDB[] | null> => {
    try {
      const response = await db.getAll();
      const data = response as responseIndexedDB[];

      return data;
    } catch (error) {
      console.error("Error fetching data from IndexedDB:", error);
      return null;
    }
  };

  const saveMessage = async (payload: Payload) => {
    try {
      await db.add(payload);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteMessage = async (id: number) => {
    try {
      await db.deleteRecord(id);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  const clearHistory = async () => {
    try {
      await db.clear();
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  return { getDataByKey, getAllData, saveMessage, deleteMessage, clearHistory };
};
