import { TextAlignStart } from "lucide-react";
import { RecordProps } from "./MainContent";
import AudioPlayer from "./AudioPlayer";

const YourExplanation = ({ recorder }: RecordProps) => {
  return (
    <div className="bg-[#2D3449]/40 rounded-2xl p-10 flex flex-col gap-2">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center text-2xl font-manrope font-bold">
          <TextAlignStart className="text-primaryLight size-5" />
          <span className="text-bigText">Your Explanation</span>
        </div>
        <div>
          {recorder.audioURL && <AudioPlayer src={recorder.audioURL} />}
        </div>
      </div>
      <p className="text-text text-xl">"{recorder.transcript}"</p>
      <div className="flex flex-col gap-6 mt-6">
        <span className="bg-[#464554]/20 h-px" />
        <span className="text-secondary text-xs">
          AUTO-GENERATED TRANSCRIPT
        </span>
      </div>
    </div>
  );
};

export default YourExplanation;
