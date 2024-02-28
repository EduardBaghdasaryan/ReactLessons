import React, { FC, useEffect } from "react";
import { playerProvider } from "../../providers/player-provider";
import { Player_Event_Types, PLAYER_STATES } from "../../constants";

type Props = {
  url: string;
  volume: number;
  isMuted: boolean;
};

export const VideoItem: FC<Props> = ({ url, volume, isMuted }) => {
  const videoRef = React.useRef<any>(null);

  useEffect(() => {
    const stateChangeOff = playerProvider.eventEmitter.on(
      Player_Event_Types.STATE_CHANGE,
      onStateChange
    );
    const timeUpdateOff = playerProvider.eventEmitter.on(
      Player_Event_Types.TIME_UPDATE,
      onTimeUpdate
    );
    const speedChangeOff = playerProvider.eventEmitter.on(
      Player_Event_Types.PLAYBACK_SPEED_CHANGE,
      onPlaybackSpeedChange
    );

    return () => {
      stateChangeOff();
      timeUpdateOff();
      speedChangeOff();
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;

    if (video) {
      video.addEventListener("canplay", onCanPlay(video));
      video.addEventListener("waiting", onWaiting);
      video.volume = volume;
      video.addEventListener("loadedmetadata", (event: any) => {
        playerProvider.setVideoDuration(event.target.duration);
      });
    }

    return () => {
      video.removeEventListener("canplay", onCanPlay);
      video.removeEventListener("waiting", onWaiting);
      video.removeEventListener("loadedmetadata", (event: any) => {
        playerProvider.setVideoDuration(event.target.duration);
      });
    };
  }, [videoRef.current, volume]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime();
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const onStateChange = (state: number) => {
    console.log("staaaaaaaate", state);

    switch (state) {
      case PLAYER_STATES.PLAYING: {
        videoRef.current?.play();
        break;
      }
      case PLAYER_STATES.PAUSED: {
        videoRef.current?.pause();
        break;
      }
    }
  };

  const onTimeUpdate = (time: number) => {
    videoRef.current && (videoRef.current.currentTime = time);
  };

  const onCanPlay = (video: any) => {
    playerProvider.removeBufferingItem(url);
  };

  const onWaiting = () => {
    playerProvider.addBufferingItem(url);
  };

  const setCurrentTime = () => {
    videoRef.current &&
      playerProvider.setCurrentTime(videoRef.current.currentTime);
  };

  const onPlaybackSpeedChange = (speed: number) => {
    videoRef.current && (videoRef.current.playbackRate = speed);
  };

  return (
    <div>
      <video
        ref={videoRef}
        src={url}
        width={640}
        height={360}
        muted={isMuted}
      />
    </div>
  );
};
