import React, { FC, useState } from "react";
import { streamRecorder } from "../providers/Recorder";
import { streamProvider } from "../providers/Stream";

const Record: FC = () => {
  const [isRecording, setIsRecording] = useState<boolean>(false);

  const handleStartRecord = () => {
    setIsRecording(true);
    streamRecorder.startRecord(streamProvider.getStream()!);
  };

  const handleEndRecord = () => {
    setIsRecording(false);
    streamProvider.endStream();
    streamRecorder.endRecord();
  };

  const handleDownload = () => {
    streamProvider.downloadRecordedVideo();
  };

  return (
    <div>
      <div>
        {isRecording ? (
          <button onClick={handleEndRecord}>End Recording</button>
        ) : (
          <button onClick={handleStartRecord}>Start Recording</button>
        )}
      </div>
      <button onClick={handleDownload}> Download</button>
    </div>
  );
};

export default Record;
