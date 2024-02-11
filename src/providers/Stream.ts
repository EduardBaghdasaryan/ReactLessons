class StreamProvider {
  private stream: MediaStream | null = null;

  async startStreaming(
    videoDeviceId: string,
    audioDeviceId: string
  ): Promise<void> {
    try {
      const constraints: MediaStreamConstraints = {
        video: { deviceId: { exact: videoDeviceId } },
        audio: { deviceId: { exact: audioDeviceId } },
      };

      this.stream = await navigator.mediaDevices.getUserMedia(constraints);
    } catch (error) {
      console.error("Error starting streaming:", error);
    }
  }

  getStream(): MediaStream | null {
    return this.stream;
  }
}

export const streamProvider = new StreamProvider();
