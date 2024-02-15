import { streamRecorder } from "./Recorder";

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

  endStream(): void {
    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop());
      this.stream = null;
      console.log("stream is ended");
    }
  }

  getStream(): MediaStream | null {
    return this.stream;
  }

  async downloadRecordedVideo(): Promise<void> {
    try {
      const recordedStreams = await streamRecorder.getRecordedStreams();

      if (recordedStreams.length === 0) {
        console.error("No recorded streams found.");
        return;
      }

      const recordedBlob = recordedStreams[recordedStreams.length - 1];
      const url = URL.createObjectURL(recordedBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "recorded_video.webm";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading recorded video:", error);
    }
  }
}

export const streamProvider = new StreamProvider();
