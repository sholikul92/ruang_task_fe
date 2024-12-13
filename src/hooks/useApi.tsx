import axios, { AxiosError } from "axios";
import { Dispatch, SetStateAction } from "react";

interface Chat {
  type: string;
  message: React.ReactNode;
}

interface ApiProps {
  setChats: Dispatch<SetStateAction<Chat[]>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<boolean>>;
  file: File | null;
  query: string;
}

export const useApi = ({ setChats, setLoading, setError, file, query }: ApiProps) => {
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

  const callApiAnalyzedFile = async () => {
    const formData = new FormData();
    if (file !== null) {
      formData.append("file", file);
      formData.append("query", query);
    }

    try {
      const response = await axios.post("http://localhost:8080/analyzed", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status == 200) {
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
        console.log(err);
        setError(true);
      }
    } finally {
      setLoading(false);
    }
  };

  return { callApiChat, callApiAnalyzedFile };
};
