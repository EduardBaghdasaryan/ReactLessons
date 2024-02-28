import EventEmitter from "../helpers/event-emitter";
import { Player_Event_Types, PLAYER_STATES } from "../constants";

class PlayerProvider {
  private bufferItems: string[] = [];
  public eventEmitter: EventEmitter = new EventEmitter();
  private playbackSpeed: number = 1;
  private currentTime: number = 0;
  private volume: number = 1;
  private isMuted: boolean = false;
  private videoDuration: number = 0;

  public addBufferingItem(url: string) {
    this.bufferItems.push(url);
    this.eventEmitter.emit(
      Player_Event_Types.STATE_CHANGE,
      PLAYER_STATES.PAUSED
    );
  }

  public removeBufferingItem(url: string) {
    const i = this.bufferItems.indexOf(url);

    if (i !== -1) {
      this.bufferItems.splice(i, 1);
      if (this.bufferItems.length === 0) {
        this.eventEmitter.emit(
          Player_Event_Types.STATE_CHANGE,
          PLAYER_STATES.PLAYING
        );
      }
    }
  }

  public play() {
    this.eventEmitter.emit(
      Player_Event_Types.STATE_CHANGE,
      PLAYER_STATES.PLAYING
    );
  }

  public pause() {
    this.eventEmitter.emit(
      Player_Event_Types.STATE_CHANGE,
      PLAYER_STATES.PAUSED
    );
  }

  public jump(time: number) {
    this.eventEmitter.emit(Player_Event_Types.TIME_UPDATE, time);
  }

  public setPlaybackSpeed(speed: number) {
    this.playbackSpeed = speed;
    this.eventEmitter.emit(Player_Event_Types.PLAYBACK_SPEED_CHANGE, speed);
  }

  public getPlaybackSpeed() {
    return this.playbackSpeed;
  }

  public setCurrentTime(time: number) {
    this.currentTime = time;
  }

  public getCurrentTime() {
    return this.currentTime;
  }

  public setVolume(volume: number) {
    this.volume = volume;
    this.eventEmitter.emit(Player_Event_Types.VOLUME_CHANGE, volume);
  }

  public setMuted(isMuted: boolean) {
    this.isMuted = isMuted;
    this.eventEmitter.emit(Player_Event_Types.MUTE_CHANGE, isMuted);
  }

  public setVideoDuration(duration: number) {
    this.videoDuration = duration;
    this.eventEmitter.emit(Player_Event_Types.VIDEO_DURATION_CHANGE, duration);
  }

  public getVideoDuration() {
    return this.videoDuration;
  }
}

export const playerProvider = new PlayerProvider();
