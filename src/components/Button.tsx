import { CircleStop, Mic } from "lucide-react";
import { SpeechToTextProps } from "@/hooks/useSpeechToText";

const Button = ({ recorder }: SpeechToTextProps) => {
  const handleClick = () => {
    if (recorder.isRecording) {
      recorder.stopRecording();
    } else {
      recorder.startRecording();
    }
  };
  return (
    <button
      onClick={handleClick}
      className={`flex items-center justify-center gap-2 font-bold py-5 rounded-2xl w-full sm:rounded-full sm:px-10 sm:w-fit sm:mx-auto ~text-lg/xl mb-4 ${recorder.isRecording ? "text-bigText bg-[#2D3449]/40 border border-[#464554]/20" : "sm:shadow-[0px_32px_64px_rgba(128,131,255,0.4)] bg-linear text-primary"}`}
    >
      {recorder.isRecording ? (
        <>
          <CircleStop className="text-recording" strokeWidth={2} size={20} />
          <span>Stop Recording</span>
        </>
      ) : (
        <>
          <Mic strokeWidth={2.5} size={20} /> <span>Start Explaining</span>
        </>
      )}
    </button>
  );
};

export default Button;
