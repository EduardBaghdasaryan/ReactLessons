class IndexedDBManager {
  private dbName: string;
  private dbVersion: number;
  private db: IDBDatabase | null = null;

  constructor(dbName: string, dbVersion: number) {
    this.dbName = dbName;
    this.dbVersion = dbVersion;
  }

  async openDB(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = window.indexedDB.open(this.dbName, this.dbVersion);

      request.onerror = (event) => {
        reject(
          `Failed to open database: ${(event.target as IDBOpenDBRequest).error}`
        );
      };

      request.onsuccess = (event) => {
        this.db = (event.target as IDBOpenDBRequest).result;
        resolve();
        console.log(this.db);
      };

      request.onupgradeneeded = (event) => {
        this.db = (event.target as IDBOpenDBRequest).result;
        if (!this.db.objectStoreNames.contains("customers")) {
          this.db.createObjectStore("customers", {
            keyPath: "id",
            autoIncrement: true,
          });
        }
      };
    });
  }

  async getItems(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject("Database not open");
        return;
      }

      const transaction = this.db.transaction("customers", "readonly");
      const objectStore = transaction.objectStore("customers");
      const request = objectStore.getAll();

      request.onerror = (event) => {
        reject(`Failed to get items: ${(event.target as IDBRequest).error}`);
      };

      request.onsuccess = (event) => {
        resolve((event.target as IDBRequest).result);
      };
    });
  }

  async addItem(item: any): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject("Database not open");
        return;
      }

      const transaction = this.db.transaction("customers", "readwrite");
      const objectStore = transaction.objectStore("customers");
      const request = objectStore.add(item);

      request.onerror = (event) => {
        reject(`Failed to add item: ${(event.target as IDBRequest).error}`);
      };

      request.onsuccess = () => {
        resolve();
      };
    });
  }
}

export const indexedDBManager = new IndexedDBManager("myDB", 1);
