import { useRef, useState, useEffect } from "react";
import { Pause, Play } from "lucide-react";

const AudioPlayer = ({ src }: { src: string }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const format = (t: number) => {
    if (!Number.isFinite(t) || t <= 0) return "00:00";

    const total = Math.floor(t);
    const m = Math.floor(total / 60)
      .toString()
      .padStart(2, "0");
    const s = (total % 60).toString().padStart(2, "0");

    return `${m}:${s}`;
  };

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const setMeta = () => setDuration(audio.duration);
    const onEnd = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", setMeta);
    audio.addEventListener("ended", onEnd);
    audio.addEventListener("play", () => setIsPlaying(true));
    audio.addEventListener("pause", () => setIsPlaying(false));

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", setMeta);
      audio.removeEventListener("ended", onEnd);
    };
  }, []);

  return (
    <div className="flex items-center gap-3 bg-[#1e263a] rounded-lg border border-[#464554]/40 py-2 px-4">
      <audio ref={audioRef} src={src} />

      <button
        className="text-primaryLight"
        onClick={togglePlay}
        disabled={!duration}
      >
        {isPlaying ? <Pause /> : <Play />}
      </button>

      <span className="text-text">
        {format(currentTime)} / {format(duration)}
      </span>
    </div>
  );
};

export default AudioPlayer;
