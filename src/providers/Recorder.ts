class StreamRecorder {
  private mediaRecorder: MediaRecorder | null = null;
  private recordedChunks: Blob[] = [];

  startRecord(stream: MediaStream): void {
    this.recordedChunks = [];
    this.mediaRecorder = new MediaRecorder(stream);

    this.mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        this.recordedChunks.push(event.data);
      }
    };

    this.mediaRecorder.onstop = async () => {
      const recordedBlob = new Blob(this.recordedChunks, {
        type: this.mediaRecorder?.mimeType,
      });
      await this.saveRecordedStream(recordedBlob);
    };

    this.mediaRecorder.start();
  }

  endRecord(): void {
    if (this.mediaRecorder && this.mediaRecorder.state !== "inactive") {
      this.mediaRecorder.stop();
    }
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
