import { CircleX, File as FileIcon, Paperclip, Send } from "lucide-react";
import React, { Dispatch, useRef } from "react";

interface PropsForm {
  handleForm: (e: React.FormEvent<HTMLFormElement>) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleInput: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  setFile: Dispatch<React.SetStateAction<File | null>>;
  file: File | null;
  query: string;
}

export const FormInput: React.FC<PropsForm> = ({ handleForm, handleFileChange, handleInput, setFile, file, query }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleAttachmentClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      fileInputRef.current.click();
    }
  };

  const handleCancelFile = () => {
    setFile(null);
  };

  return (
    <form method='POST' onSubmit={handleForm} className='flex mx-4 space-x-1 border-2 rounded-xl p-2 items-end mt-2'>
      <button
        type='button'
        className='flex items-center justify-center w-10 h-10 rounded-full hover:text-gray-600 text-gray-400'
        aria-label='Attach file'
        onClick={handleAttachmentClick}
      >
        <Paperclip className='w-5 h-5' />
      </button>

      <input type='file' ref={fileInputRef} style={{ display: "none" }} aria-label='File input' onChange={handleFileChange} />
      <div className='flex flex-col w-full'>
        {file && (
          <div className='bg-gray-200 flex w-max p-2 pr-8 mb-4 relative'>
            <FileIcon /> {file?.name}
            <button onClick={handleCancelFile} className='absolute top-1 right-1'>
              <CircleX color='#c01616' size={15} />
            </button>
          </div>
        )}
        <textarea
          ref={textAreaRef}
          placeholder='Input your message...'
          value={query}
          rows={2}
          cols={24}
          style={{ lineHeight: "1.2" }}
          className='focus:outline-none w-full resize-none overflow-auto'
          onChange={handleInput}
        />
      </div>
      <button type='submit' className='rounded-full p-2.5 '>
        <Send className='text-primary' />
      </button>
    </form>
  );
};
