"use client";

import { useRef, useState } from "react";
import styles from "@/app/page.module.css";

export default function HomeBrandFilm() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  function togglePlayback() {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    if (video.paused) {
      void video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }

  function toggleMute() {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    const nextMuted = !video.muted;
    video.muted = nextMuted;
    if (!nextMuted) {
      video.volume = 1;
    }
    setIsMuted(nextMuted);
  }

  return (
    <>
      <video
        ref={videoRef}
        className={styles.heroVideo}
        src="/brandfilm/sable-brandfilm.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      />
      <button
        className={styles.playToggle}
        type="button"
        aria-label={isPlaying ? "Pause brand film" : "Play brand film"}
        aria-pressed={!isPlaying}
        onClick={togglePlayback}
      >
        {!isPlaying ? (
          <span className={styles.playIcon} aria-hidden="true">
            <svg viewBox="0 0 24 24" width="48" height="48" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        ) : null}
      </button>
      <button
        className={styles.soundTrigger}
        type="button"
        aria-label={isMuted ? "Unmute brand film" : "Mute brand film"}
        aria-pressed={!isMuted}
        onClick={toggleMute}
      >
        {isMuted ? (
          <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
            <path d="M3.5 9v6h4l5 5V4l-5 5h-4z" />
            <path d="M16 8.5l5 5M21 8.5l-5 5" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
            <path d="M3.5 9v6h4l5 5V4l-5 5h-4z" />
            <path d="M15.5 8.5a5 5 0 0 1 0 7M17.5 6a8 8 0 0 1 0 12" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          </svg>
        )}
      </button>
    </>
  );
}
