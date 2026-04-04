import { ChevronDown } from "lucide-react";
import { ReactNode, useState } from "react";

interface Props {
  children: ReactNode;
  getLanguage: (value: Language) => void;
}

const LANGUAGES = [
  "tsx",
  "jsx",
  "typescript",
  "javascript",
  "python",
  "java",
] as const;

export type Language = (typeof LANGUAGES)[number];

const CodeBlockContainter = ({ children, getLanguage }: Props) => {
  const [language, setLanguage] = useState<Language>("java");
  const [open, setOpen] = useState(false);
  return (
    <div className="max-w-6xl w-full rounded-2xl overflow-hidden border border-[#464554]/40">
      <div className="flex justify-between items-center bg-[#060E20]/50 py-3 px-4">
        <div className="flex gap-2">
          <span className="block bg-[#ffb4ab]/40 size-3 rounded-full" />
          <span className="block bg-[#FFB783]/40 size-3 rounded-full" />
          <span className="block bg-[#C0C1FF]/40 size-3 rounded-full" />
        </div>
        <div className="relative inline-block">
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="flex items-center text-xs text-secondary gap-1.5"
          >
            {language.toUpperCase()} <ChevronDown size={20} />
          </button>

          {open && (
            <div className="absolute right-5 mt-2 w-32 bg-[#1e263a] rounded shadow-lg z-10">
              {LANGUAGES.map((lang) => (
                <div
                  key={lang}
                  onClick={() => {
                    setLanguage(lang);
                    getLanguage(lang);
                    setOpen(false);
                  }}
                  className="px-3 py-2 text-sm cursor-pointer text-text hover:text-secondary duration-150"
                >
                  {lang.toUpperCase()}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};

export default CodeBlockContainter;
