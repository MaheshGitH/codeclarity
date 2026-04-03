"use client";

import Record from "./Record";
import Button from "./Button";
import YourExplanation from "./YourExplanation";
import Feedback from "./Feedback";
import { useSpeechToText } from "@/hooks/useSpeechToText";

const MainContent = () => {
  const recorder = useSpeechToText();

  return (
    <div>
      <div className="flex flex-col items-center gap-8">
        <Record recorder={recorder} />
        <Button recorder={recorder} />
      </div>
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 mt-20">
        <YourExplanation recorder={recorder} />
        <Feedback recorder={recorder} />
      </div>
    </div>
  );
};

export default MainContent;
