import { TextAlignStart, Mic } from "lucide-react";
import AudioPlayer from "./AudioPlayer";
import { SpeechToTextProps } from "@/hooks/useSpeechToText";

const YourExplanation = ({ recorder }: SpeechToTextProps) => {
  const hasTranscript = recorder.transcript.trim().length > 0;

  return (
    <div className="bg-[#2D3449]/40 rounded-2xl p-10 w-full flex flex-col gap-2">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center ~text-lg/2xl font-manrope font-bold">
          <TextAlignStart className="text-primaryLight ~size-4/5" />
          <span className="text-bigText">Your Explanation</span>
        </div>
        {recorder.audioURL && <AudioPlayer src={recorder.audioURL} />}
      </div>

      {hasTranscript ? (
        <p className="text-text ~text-sm/xl">"{recorder.transcript.trim()}"</p>
      ) : (
        <div className="flex flex-col items-center justify-center gap-3 py-10 text-center">
          <Mic className="text-secondary ~size-6/8" />
          <p className="text-secondary ~text-xs/sm">
            Hit record and explain your code as if you're in an interview.
          </p>
        </div>
      )}

      <div className="flex flex-col gap-6 mt-auto">
        <span className="bg-[#464554]/20 h-px" />
        <span className="text-secondary text-xs">
          {hasTranscript
            ? "AUTO-GENERATED TRANSCRIPT"
            : "TRANSCRIPT WILL APPEAR HERE"}
        </span>
      </div>
    </div>
  );
};

export default YourExplanation;
