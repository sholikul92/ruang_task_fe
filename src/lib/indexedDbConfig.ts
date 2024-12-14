// Konfigurasi database
export const dbConfig = {
  name: "ruang_chat_db",
  version: 1,
  objectStoresMeta: [
    {
      store: "chats",
      storeConfig: { keyPath: "id", autoIncrement: true },
      storeSchema: [
        { name: "user_id", keypath: "user_id", options: { unique: false } },
        { name: "chat_id", keypath: "chat_id", options: { unique: false } },
        { name: "data", keypath: "data", options: { unique: false } },
        { name: "created_at", keypath: "created_at", options: { unique: false } },
        { name: "updated_at", keypath: "updated_at", options: { unique: false } },
      ],
    },
  ],
};
