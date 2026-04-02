import { CircleCheck, SquareKanban } from "lucide-react";
import { RecordProps } from "./MainContent";

const Feedback = ({ recorder }: RecordProps) => {
  return (
    <div className="bg-[#131B2E] rounded-2xl p-10 flex flex-col gap-10 w-full">
      <div className="flex gap-2 items-center ~text-lg/2xl font-manrope font-bold">
        <SquareKanban className="text-lightOrange rotate-180 ~size-4/5" />
        <span className="text-bigText">Feedback</span>
      </div>
      <div className="grid grid-cols-2 gap-y-6">
        <div>
          <span className="text-xs text-secondary">SPEAKING PACE</span>
          <p className="font-semibold text-bad text-xl mt-3">
            18 WPM <span className="text-xs">(SLOW)</span>
          </p>
        </div>
        <div>
          <span className="text-xs text-secondary">CLARITY</span>
          <p className="font-semibold text-good text-xl mt-3">Low</p>
        </div>
        <div>
          <span className="text-xs text-secondary">STRUCTURE</span>
          <p className="font-semibold text-xl mt-3 text-neutral">
            Needs improvement
          </p>
        </div>
        <div>
          <span className="text-xs text-secondary">EXPLANATION LENGTH</span>
          <p className="font-semibold text-neutral text-xl mt-3">Too Short</p>
        </div>
        <div className="col-span-2">
          <span className="text-xs text-secondary">SUGGESTIONS</span>
          <ul>
            <li className="flex items-center gap-2 mt-3">
              <CircleCheck className="text-primaryLight size-5" />
              <p className="text-text">
                Lead with complexity: Mention O(n) upfront for technical depth.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
