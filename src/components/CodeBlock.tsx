import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Clipboard } from "lucide-react";

interface Props {
  code: string;
  language: string;
  onPaste: () => void;
}

const CodeBlock = ({ code, language, onPaste }: Props) => {
  return (
    <div className="relative group">
      <button
        onClick={onPaste}
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition bg-[#2a3550] text-secondary p-2 ~text-sm/lg rounded-lg"
      >
        <Clipboard size={16} />
      </button>

      <SyntaxHighlighter
        language={language}
        showLineNumbers
        style={oneDark}
        customStyle={{
          background: "#1e263a",
          borderRadius: 0,
          margin: 0,
        }}
        codeTagProps={{
          style: {
            fontSize:
              "clamp(0.875rem, calc(0.875rem + (1.125 - 0.875) * ((100vw - 20rem) / (96 - 20))), 1.125rem)",
            lineHeight: "1.6",
          },
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;
