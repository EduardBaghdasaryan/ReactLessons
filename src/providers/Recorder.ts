class StreamRecorder {
  private mediaRecorder: MediaRecorder | null = null;
  private recordedChunks: Blob[] = [];
  private chunkInterval: number = 2000;

  async getRecordedStreams(): Promise<Blob[]> {
    return new Promise((resolve, reject) => {
      try {
        const request = indexedDB.open("recordedStreamsDB", 1);

        request.onerror = (event) => {
          reject(
            `Error opening database: ${
              (event.target as IDBOpenDBRequest).error
            }`
          );
        };

        request.onsuccess = async (event) => {
          const db = (event.target as IDBOpenDBRequest).result;
          const transaction = db.transaction("recordedStreams", "readonly");
          const objectStore = transaction.objectStore("recordedStreams");
          const getRequest = objectStore.getAll();

          getRequest.onerror = (event) => {
            reject(
              `Error retrieving recorded streams: ${
                (event.target as IDBRequest).error
              }`
            );
          };

          getRequest.onsuccess = (event) => {
            resolve((event.target as IDBRequest).result as Blob[]);
          };
        };
      } catch (error) {
        reject(`Error getting recorded streams: ${error}`);
      }
    });
  }

  startRecord(stream: MediaStream): void {
    this.recordedChunks = [];
    this.mediaRecorder = new MediaRecorder(stream);

    console.log("recordedChunks", this.recordedChunks);

    this.mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        this.recordedChunks.push(event.data);
      }
    };

    this.mediaRecorder.start(this.chunkInterval);
  }

  endRecord(): void {
    if (this.mediaRecorder && this.mediaRecorder.state !== "inactive") {
      this.mediaRecorder.stop();
      this.combineChunks();
    }

    console.log("end", this.recordedChunks);
  }

  private combineChunks(): void {
    const recordedBlob = new Blob(this.recordedChunks, {
      type: this.mediaRecorder?.mimeType,
    });
    this.saveRecordedStream(recordedBlob);
  }

  private async saveRecordedStream(recordedBlob: Blob): Promise<void> {
    try {
      const request = indexedDB.open("recordedStreamsDB", 1);

      request.onerror = (event) => {
        console.error(
          "Error opening database:",
          (event.target as IDBOpenDBRequest).error
        );
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        const objectStore = db.createObjectStore("recordedStreams", {
          autoIncrement: true,
        });

        objectStore.transaction.oncomplete = () => {
          console.log("Object store created.");
        };
      };

      request.onsuccess = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        const transaction = db.transaction(["recordedStreams"], "readwrite");
        const objectStore = transaction.objectStore("recordedStreams");

        const addRequest = objectStore.add(recordedBlob);

        addRequest.onsuccess = () => {
          console.log("Recorded stream saved successfully.");
        };
      };
    } catch (error) {
      console.error("Error saving recorded stream:", error);
    }
  }
}

export const streamRecorder = new StreamRecorder();
