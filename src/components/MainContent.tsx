"use client";

import Record from "./Record";
import Button from "./Button";
import { useVoiceRecorder } from "@/hook/useVoiceRecorder";
import YourExplanation from "./YourExplanation";

type Recorder = {
  isRecording: boolean;
  audioURL: string | null;
  time: number;
  transcript: string;
  startRecording: () => Promise<void>;
  stopRecording: () => void;
};

export type RecordProps = {
  recorder: Recorder;
};

const MainContent = () => {
  const recorder = useVoiceRecorder();
  return (
    <div>
      <div className="flex flex-col items-center gap-8">
        <Record recorder={recorder} />
        <Button recorder={recorder} />
      </div>
      <YourExplanation recorder={recorder} />
    </div>
  );
};

export default MainContent;
