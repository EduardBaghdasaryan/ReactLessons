import React, { FC, useEffect, useRef, useState } from "react";
import { VideoItem } from "../video-item";
import { playerProvider } from "../../providers/player-provider";
import { Player_Event_Types } from "../../constants";

export const Home: FC = () => {
  const [showPlayer, setShowPlayer] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const sliderRef = useRef<HTMLInputElement>(null);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [videoDuration, setVideoDuration] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const current = playerProvider.getCurrentTime();

      setCurrentTime(current);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const durationChangeOff = playerProvider.eventEmitter.on(
      Player_Event_Types.VIDEO_DURATION_CHANGE,
      handleVideoDurationChange
    );

    return () => {
      durationChangeOff();
    };
  }, []);

  const handleVideoDurationChange = (duration: number) => {
    setVideoDuration(duration);
  };

  const onStateToggle = () => {
    isPlaying ? playerProvider.pause() : playerProvider.play();
    setIsPlaying(!isPlaying);
  };

  const onTimeChange = () => {
    console.log("aaaaaaa", sliderRef.current);

    if (sliderRef.current) {
      const newPosition = parseFloat(sliderRef.current.value);
      setCurrentTime(newPosition);
      playerProvider.jump(newPosition);
    }
  };

  const onPlaybackSpeedChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newSpeed = parseFloat(event.target.value);
    setPlaybackSpeed(newSpeed);
    playerProvider.setPlaybackSpeed(newSpeed);
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);
    playerProvider.setVolume(newVolume);
  };

  const toggleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    playerProvider.setMuted(newMuted);
  };

  return (
    <div>
      {showPlayer ? (
        <>
          <VideoItem
            volume={volume}
            isMuted={isMuted}
            url="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          />
          <VideoItem
            isMuted={isMuted}
            volume={volume}
            url="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          />
          <VideoItem
            isMuted={isMuted}
            volume={volume}
            url="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          />
        </>
      ) : (
        <button onClick={() => setShowPlayer(true)}>Show</button>
      )}
      <button onClick={onStateToggle}>{isPlaying ? "Pause" : "Play"}</button>
      <input
        ref={sliderRef}
        type="range"
        min={0}
        max={videoDuration}
        step={1}
        value={currentTime}
        onChange={onTimeChange}
      />
      <select value={playbackSpeed} onChange={onPlaybackSpeedChange}>
        <option value={0.5}>0.5x</option>
        <option value={0.75}>0.75x</option>
        <option value={1}>1x</option>
        <option value={1.25}>1.25x</option>
        <option value={1.5}>1.5x</option>
        <option value={2}>2x</option>
      </select>
      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={volume}
        onChange={handleVolumeChange}
      />
      <button onClick={toggleMute}>{isMuted ? "Unmute" : "Mute"}</button>
    </div>
  );
};
