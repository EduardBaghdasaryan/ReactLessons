class DeviceManager {
  private devices: MediaDeviceInfo[] = [];
  private defaultVideoDeviceId: string | null = null;
  private defaultAudioDeviceId: string | null = null;

  async fetchDevices(): Promise<void> {
    try {
      const devices: MediaDeviceInfo[] = await navigator.mediaDevices.enumerateDevices();
      this.devices = devices.filter(device => device.kind === 'videoinput' || device.kind === 'audioinput');
      this.setDefaultDevices();
    } catch (error) {
      console.error('Error fetching devices:', error);
    }
  }

  private setDefaultDevices(): void {
    const defaultVideoDevice = this.devices.find(device => device.kind === 'videoinput');
    const defaultAudioDevice = this.devices.find(device => device.kind === 'audioinput');

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