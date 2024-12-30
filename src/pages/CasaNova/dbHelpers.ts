import { openDB, IDBPDatabase } from 'idb';

const DB_NAME = 'lazyLoadingDB';
const STORE_NAME = 'images';

// Inicializa o banco de dados
export const initDB = async (): Promise<IDBPDatabase> => {
  const db = await openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    },
  });
  return db;
};

// Salva um valor no IndexedDB
export const saveToDB = async (key: string, value: string): Promise<void> => {
  const db = await initDB();
  await db.put(STORE_NAME, value, key);
};

// Recupera um valor do IndexedDB
export const getFromDB = async (key: string): Promise<string | undefined> => {
  const db = await initDB();
  return await db.get(STORE_NAME, key);
};

// Remove um valor do IndexedDB
export const deleteFromDB = async (key: string): Promise<void> => {
  const db = await initDB();
  await db.delete(STORE_NAME, key);
};

// Limpa todo o IndexedDB
export const clearDB = async (): Promise<void> => {
  const db = await initDB();
  await db.clear(STORE_NAME);
};
