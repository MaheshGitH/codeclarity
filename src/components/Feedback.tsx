import { analyzeSpeech } from "@/libs/analyzeSpeech";
import { SpeechToTextProps } from "@/hooks/useSpeechToText";
import { CircleCheck, SquareKanban } from "lucide-react";
import { cn } from "@/libs/cn";

const paceColor: Record<string, string> = {
  Slow: "text-bad",
  Good: "text-good",
  Fast: "text-neutral",
  "N/A": "text-secondary",
};

const clarityColor: Record<string, string> = {
  Unclear: "text-bad",
  Okay: "text-neutral",
  Clear: "text-good",
};

const structureColor: Record<string, string> = {
  Poor: "text-bad",
  Good: "text-neutral",
  Strong: "text-good",
};

const lengthColor: Record<string, string> = {
  "Too Short": "text-neutral",
  Good: "text-good",
  "Too Long": "text-bad",
};

const Feedback = ({ recorder }: SpeechToTextProps) => {
  const feedback = analyzeSpeech(" hello bro mihasdf haf", 60);

  const fillerRegex =
    /\b(um+|uh+|er+|like|you know|basically|literally|actually|so yeah|i mean)\b/gi;
  const fillerMatches = [...(recorder.transcript.match(fillerRegex) ?? [])];
  const uniqueFillers = [...new Set(fillerMatches.map((f) => f.toLowerCase()))];

  const hasTranscript = recorder.transcript.trim().length > 0;

  return (
    <div className="bg-[#131B2E] rounded-2xl p-10 flex flex-col gap-10 w-full">
      <div className="flex gap-2 items-center ~text-lg/2xl font-manrope font-bold">
        <SquareKanban className="text-lightOrange rotate-180 ~size-4/5" />
        <span className="text-bigText">Feedback</span>
      </div>

      {!hasTranscript ? (
        <p className="text-secondary text-sm">
          Record an answer to see your feedback.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-y-6">
          <div>
            <span className="text-xs text-secondary">SPEAKING PACE</span>
            <p
              className={cn(
                "font-semibold text-xl mt-3",
                paceColor[feedback.speakingPace],
              )}
            >
              {feedback.wpm !== null ? (
                <>
                  {feedback.wpm} WPM{" "}
                  <span className="text-xs">
                    ({feedback.speakingPace.toUpperCase()})
                  </span>
                </>
              ) : (
                <span className="text-xs uppercase">
                  {feedback.speakingPace}
                </span>
              )}
            </p>
            {feedback.isShortSample && feedback.wpm !== null && (
              <p className="text-xs text-secondary mt-1">
                * Under 60s — pace estimate only
              </p>
            )}
          </div>

          <div>
            <span className="text-xs text-secondary">CLARITY</span>
            <p
              className={cn(
                "font-semibold text-xl mt-3",
                clarityColor[feedback.clarity],
              )}
            >
              {feedback.clarity}
            </p>
          </div>

          <div>
            <span className="text-xs text-secondary">FILLER WORDS</span>
            <p className="font-semibold text-xl mt-3 text-text">
              {fillerMatches.length > 0 ? (
                <>
                  {fillerMatches.length}{" "}
                  <span className="font-normal text-base text-secondary">
                    ({uniqueFillers.join(", ")})
                  </span>
                </>
              ) : (
                <span className="text-good">None detected</span>
              )}
            </p>
          </div>

          <div>
            <span className="text-xs text-secondary">STRUCTURE</span>
            <p
              className={cn(
                "font-semibold text-xl mt-3",
                structureColor[feedback.structure],
              )}
            >
              {feedback.structure}
            </p>
          </div>

          <div className="col-span-2">
            <span className="text-xs text-secondary">EXPLANATION LENGTH</span>
            <p
              className={cn(
                "font-semibold text-xl mt-3",
                lengthColor[feedback.length],
              )}
            >
              {feedback.length}
            </p>
          </div>

          <div className="col-span-2">
            <span className="text-xs text-secondary">SUGGESTIONS</span>
            <ul className="flex flex-col gap-2 mt-3">
              {feedback.suggestions.map((suggestion, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CircleCheck className="text-primaryLight size-5 mt-0.5 shrink-0" />
                  <p className="text-text">{suggestion}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Feedback;
