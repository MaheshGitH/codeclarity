"use client";

import { useState } from "react";
import CodeBlockContainter, { Language } from "./CodeBlockContainter";
import CodeBlock from "./CodeBlock";

const CodeBlockSection = () => {
  const [lang, setLang] = useState<Language>("java");
  const [code, setCode] = useState(`public class Main {
    public static int addTwoNumbers(int a, int b) {
        return a + b;
    }

    public static void main(String[] args) {
        int result = addTwoNumbers(3, 5);
        System.out.println(result); // 8
    }
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
