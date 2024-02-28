export const Message_Types = {
  NEW_MESSAGE: "new_message",
  LOAD_MESSAGES: "load_messages",
};

export const Messages_Event_Types = {
  ADD_MESSAGE: "add_message",
  UPDATE_MESSAGES: "update_messages",
};

export const Player_Event_Types = {
  STATE_CHANGE: "STATE_CHANGE",
  TIME_UPDATE: "TIME_UPDATE",
  PLAYBACK_SPEED_CHANGE: "PLAYBACK_SPEED_CHANGE",
  VOLUME_CHANGE: "VOLUME_CHANGE",
  MUTE_CHANGE: "MUTE_CHANGE",
  VIDEO_DURATION_CHANGE: "VIDEO_DURATION_CHANGE",
};

export enum PLAYER_STATES {
  PLAYING,
  PAUSED,
}
