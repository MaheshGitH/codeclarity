"use client";

import { useState } from "react";
import CodeBlockContainter, { Language } from "./CodeBlockContainter";
import CodeBlock from "./CodeBlock";

const CodeBlockSection = () => {
  const [lang, setLang] = useState<Language>("tsx");
  const [code, setCode] =
    useState(`import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter/dist/esm';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

type Props = {
  code: string;
};

export default function CodeBlock({ code }: Props) {
  return (
    <SyntaxHighlighter language="typescript" style={oneDark}>
      {code}
    </SyntaxHighlighter>
  );
}`);
  const handlePaste = async () => {
    const text = await navigator.clipboard.readText();
    setCode(text);
  };
  return (
    <div className="flex justify-center">
      <CodeBlockContainter getLanguage={(value) => setLang(value)}>
        <CodeBlock language={lang} code={code} onPaste={handlePaste} />
      </CodeBlockContainter>
    </div>
  );
};

export default CodeBlockSection;
