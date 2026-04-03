import formatTime from "@/libs/formatTime";
import { SpeechToTextProps } from "@/hooks/useSpeechToText";

const Record = ({ recorder }: SpeechToTextProps) => {
  if (!recorder.isRecording && recorder.time == 0) {
    return null;
  } else {
    return (
      <div className="flex items-center gap-2 w-fit bg-recordingBg text-recording font-bold text-sm py-3 px-5 border border-recording rounded-full">
        <span className="block bg-recording rounded-full size-2" />
        <span>{recorder.isRecording ? "RECORDING" : "RECORDED"}</span>
        <span className="text-text w-12">{formatTime(recorder.time)}</span>
      </div>
    );
  }
};

export default Record;
