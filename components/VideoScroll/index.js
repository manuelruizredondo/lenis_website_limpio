import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger);

export function VideoScroll({ videoUrl, alto }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const videoElement = videoRef.current;

    const updateVideoTime = (self) => {
      if (videoElement && videoElement.duration) {
        const duration = videoElement.duration;
        videoElement.currentTime = duration * self.progress;
      }
    };

    const scrollTrigger = ScrollTrigger.create({
      trigger: videoElement,
      start: 'top top',
      end: 'bottom top',
      scrub: true,
      pin: true,
      onUpdate: updateVideoTime,
    });

    return () => {
      scrollTrigger.kill();
    };
  }, []);

  return (
    <div style={{ height: alto, width: '100vw' }}>
      <video ref={videoRef} src={videoUrl} style={{ width: '100vw' }} />
    </div>
  );
}