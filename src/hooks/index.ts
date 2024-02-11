import { useEffect, useRef, useState } from 'react';
import { streamProvider } from '../providers/Stream';
import { deviceManager } from '../providers/DeviceManager';

interface MediaDeviceInfoExtended extends MediaDeviceInfo {
  selected: boolean;
}

export const useStream = (): [React.RefObject<HTMLVideoElement>, MediaDeviceInfoExtended[], MediaDeviceInfoExtended[], (deviceId: string, type: 'video' | 'audio') => void] => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [cameras, setCameras] = useState<MediaDeviceInfoExtended[]>([]);
  const [microphones, setMicrophones] = useState<MediaDeviceInfoExtended[]>([]);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        await deviceManager.fetchDevices();

        const allDevices = deviceManager.getAllDevices();

        const camerasArray = allDevices.filter(device => device.kind === 'videoinput').map(device => ({ ...device, selected: false }));
        const microphonesArray = allDevices.filter(device => device.kind === 'audioinput').map(device => ({ ...device, selected: false }));

        setCameras(camerasArray);
        setMicrophones(microphonesArray);

        if (camerasArray.length > 0) {
          camerasArray[0].selected = true;
        }
        if (microphonesArray.length > 0) {
          microphonesArray[0].selected = true;
        }

        startStreaming(camerasArray[0].deviceId, microphonesArray[0].deviceId);
      } catch (error) {
        console.error('Error fetching devices:', error);
      }
    };

    fetchDevices();
  }, []);

  const startStreaming = async (videoDeviceId: string, audioDeviceId: string) => {
    try {
      await streamProvider.startStreaming(videoDeviceId, audioDeviceId);

      const videoElement = videoRef.current;
      if (videoElement) {
        videoElement.srcObject = streamProvider.getStream();
        videoElement.play()
          .then(() => console.log('Video playback started.'))
          .catch(error => console.error('Error starting video playback:', error));
      }
    } catch (error) {
      console.error('Error starting streaming:', error);
    }
  };

  const handleDeviceChange = (deviceId: string, type: 'video' | 'audio') => {
    const devicesArray = type === 'video' ? cameras : microphones;
    devicesArray.forEach(device => device.selected = device.deviceId === deviceId);

    if (type === 'video') {
      setCameras([...devicesArray]);
    } else {
      setMicrophones([...devicesArray]);
    }

    startStreaming(type === 'video' ? deviceId : cameras.find(device => device.selected)!.deviceId, type === 'audio' ? deviceId : microphones.find(device => device.selected)!.deviceId);
  };

  return [videoRef, cameras, microphones, handleDeviceChange];
};
