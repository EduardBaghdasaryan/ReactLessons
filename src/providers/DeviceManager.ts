import { KIND_TYPES } from "../constants";

class DeviceManager {
  private devices: MediaDeviceInfo[] = [];
  private defaultVideoDeviceId: string | null = null;
  private defaultAudioDeviceId: string | null = null;

  async fetchDevices(): Promise<void> {
    try {
      const devices: MediaDeviceInfo[] =
        await navigator.mediaDevices.enumerateDevices();
      this.devices = devices.filter(
        (device) =>
          device.kind === KIND_TYPES.VIDEO || device.kind === KIND_TYPES.AUDIO
      );
      this.setDefaultDevices();
    } catch (error) {
      console.error("Error fetching devices:", error);
    }
  }

  private setDefaultDevices(): void {
    const defaultVideoDevice = this.devices.find(
      (device) => device.kind === KIND_TYPES.VIDEO
    );
    const defaultAudioDevice = this.devices.find(
      (device) => device.kind === KIND_TYPES.AUDIO
    );

    if (defaultVideoDevice) {
      this.defaultVideoDeviceId = defaultVideoDevice.deviceId;
    }

    if (defaultAudioDevice) {
      this.defaultAudioDeviceId = defaultAudioDevice.deviceId;
    }
  }

  getDefaultVideoDeviceId(): string | null {
    return this.defaultVideoDeviceId;
  }

  getDefaultAudioDeviceId(): string | null {
    return this.defaultAudioDeviceId;
  }

  getAllDevices(): MediaDeviceInfo[] {
    return this.devices;
  }
}

export const deviceManager = new DeviceManager();
