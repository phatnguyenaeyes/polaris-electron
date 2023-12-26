/* eslint-disable react/display-name */
import React, {
  useEffect,
  useRef,
  useState,
  useImperativeHandle,
  forwardRef,
} from 'react';
import { PlayCircleFilled, PauseCircleFilled } from '@ant-design/icons';
import {
  Audio01Icon,
  Audio02Icon,
} from '@app/components/common/icons/AudioIcon';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';

// const audioSrc = '/audio.mp3';

export const SimpleAudioPlayerButton = forwardRef<any, any>(
  ({ src, onPlay }, ref) => {
    const [trackProgress, setTrackProgress] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    // Refs
    const audioRef = useRef(new Audio(src));
    const intervalRef = useRef<NodeJS.Timer>();

    useImperativeHandle(ref, () => ({
      stopAndReset: () => {
        handleStopAndResetPlayer();
      },
      isPlaying: isPlaying,
    }));

    const handleStopAndResetPlayer = () => {
      audioRef.current?.pause();
      audioRef.current?.load();
      resetTrack();
    };

    const resetTrack = () => {
      setTrackProgress(0);
      clearInterval(intervalRef.current);
      setIsPlaying(false);
    };
    const startTimer = () => {
      // Clear any timers already running
      clearInterval(intervalRef.current);

      intervalRef.current = setInterval(() => {
        if (audioRef.current.ended) {
          resetTrack();
        } else {
          setTrackProgress(audioRef.current.currentTime);
        }
      }, 1000);
    };

    useEffect(() => {
      if (isPlaying) {
        audioRef.current.play();
        startTimer();
      } else {
        audioRef.current.pause();
      }
    }, [isPlaying]);

    useEffect(() => {
      // Pause and clean up on unmount
      return () => {
        audioRef.current.pause();
        clearInterval(intervalRef.current);
      };
    }, []);

    return (
      <BaseButton
        type="ghost"
        disabled={!audioRef.current}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsPlaying(!isPlaying);
          if (!isPlaying) {
            onPlay?.();
          }
        }}
      >
        {isPlaying ? <Audio01Icon /> : <Audio02Icon />}
      </BaseButton>
    );
  },
);
