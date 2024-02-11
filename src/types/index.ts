export type Device = {
  deviceId: string;
  groupId: string;
  kind: string;
  label: string;
  toJSON: () => JSON;
  selected: boolean;
};
