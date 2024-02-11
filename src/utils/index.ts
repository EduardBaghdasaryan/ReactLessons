import { KIND_TYPES } from "../constants";

export const filterAndMapDevices = (
  allDevices: MediaDeviceInfo[],
  kind: KIND_TYPES
) => {
  return allDevices
    .filter((device) => device.kind === kind)
    .map((device) => ({
      deviceId: device.deviceId,
      groupId: device.groupId,
      kind: device.kind,
      label: device.label,
      toJSON: device.toJSON,
      selected: false,
    }));
};
