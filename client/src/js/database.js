import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

  export const putDb = async (content) => {
    try {
      console.log('Put to database');
  
      const jateDb = await openDB('jate', 1);
  
      const tx = jateDb.transaction('jate', 'readwrite');
  
      const store = tx.objectStore('jate');
  
      const request = store.put({ id: 1, value: content });
  
      const result = await request;
      console.log('data saved', result);
    } catch (err) {
      console.error('I am an error while adding content to the database:', err);
    }
  };


export const getAllDb = async () => {
  try {
    console.log('GET all from database');

    const jateDb = await openDB('jate', 1);

    const tx = jateDb.transaction('jate', 'readonly');

    const store = tx.objectStore('jate');

    const request = store.get(1);

    const result = await request;
    console.log('result.value', result);
    return result?.value;
  } catch (err) {
    console.error('Error while getting content from the database:', err);
    
  }
};
initdb();
