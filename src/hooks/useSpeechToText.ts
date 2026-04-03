"use client";
import { useState, useRef, useCallback } from "react";

interface UseSpeechToTextReturn {
  isRecording: boolean;
  isTranscribing: boolean;
  transcript: string;
  audioURL: string | null;
  time: number;
  error: string | null;
  startRecording: () => Promise<void>;
  stopRecording: () => void;
}

export type SpeechToTextProps = {
  recorder: UseSpeechToTextReturn;
};

export function useSpeechToText(): UseSpeechToTextReturn {
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [time, setTime] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const startRecording = useCallback(async () => {
    setError(null);
    setTranscript("");
    setAudioURL(null);
    setTime(0);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "audio/webm",
      });
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current, { type: "audio/webm" });
        setAudioURL(URL.createObjectURL(audioBlob));

        stream.getTracks().forEach((track) => track.stop());
        streamRef.current = null;

        setIsTranscribing(true);
        await transcribeAudio(audioBlob);
        setIsTranscribing(false);
      };

      mediaRecorder.start();
      setIsRecording(true);

      intervalRef.current = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    } catch {
      setError("Microphone access denied");
      streamRef.current?.getTracks().forEach((t) => t.stop());
    }
  }, []);

  const stopRecording = useCallback(() => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
    stopTimer();
  }, []);

  const transcribeAudio = async (audioBlob: Blob) => {
    const formData = new FormData();
    formData.append("audio", audioBlob, "recording.webm");

    try {
      const res = await fetch("/api/transcribe", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (data.error) setError(data.error);
      else setTranscript(data.text);
    } catch {
      setError("Transcription failed");
    }
  };

  return {
    isRecording,
    isTranscribing,
    transcript,
    audioURL,
    time,
    error,
    startRecording,
    stopRecording,
  };
}
