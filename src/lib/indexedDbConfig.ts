// Konfigurasi database
export const dbConfig = {
  name: "ruang_chat_db",
  version: 1,
  objectStoresMeta: [
    {
      store: "users",
      storeConfig: { keyPath: "id", autoIncrement: true },
      storeSchema: [{ name: "name", keypath: "name", options: { unique: false } }],
    },
    {
      store: "chats",
      storeConfig: { keyPath: "id", autoIncrement: false },
      storeSchema: [
        { name: "userId", keypath: "userId", options: { unique: false } },
        { name: "message", keypath: "message", options: { unique: false } },
      ],
    },
  ],
};
