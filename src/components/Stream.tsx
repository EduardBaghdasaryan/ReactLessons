import React, { FC } from "react";
import { useStream } from "../hooks/index";
import { KIND_TYPES } from "../constants";

const Stream: FC = () => {
  const [videoRef, cameras, microphones, handleDeviceChange] = useStream();

  const handleCameraChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    handleDeviceChange(event.target.value, KIND_TYPES.VIDEO);
  };

  const handleMicrophoneChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    handleDeviceChange(event.target.value, KIND_TYPES.AUDIO);
  };

  return (
    <div>
      <div>
        <label htmlFor="camera">Select Camera:</label>
        <select id="camera" onChange={handleCameraChange}>
          {cameras?.map((camera) => (
            <option key={camera.deviceId} value={camera.deviceId}>
              {camera.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="microphone">Select Microphone:</label>
        <select id="microphone" onChange={handleMicrophoneChange}>
          {microphones?.map((microphone) => (
            <option key={microphone.deviceId} value={microphone.deviceId}>
              {microphone.label}
            </option>
          ))}
        </select>
      </div>
      <video ref={videoRef} autoPlay playsInline muted />
    </div>
  );
};

export default Stream;
