"use client";
import ReactMarkdown from "react-markdown";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/cjs/styles/prism";

import tsx from "react-syntax-highlighter/dist/cjs/languages/prism/tsx";
import typescript from "react-syntax-highlighter/dist/cjs/languages/prism/typescript";
import scss from "react-syntax-highlighter/dist/cjs/languages/prism/scss";
import bash from "react-syntax-highlighter/dist/cjs/languages/prism/bash";
import markdown from "react-syntax-highlighter/dist/cjs/languages/prism/markdown";
import json from "react-syntax-highlighter/dist/cjs/languages/prism/json";
import lua from "react-syntax-highlighter/dist/cjs/languages/prism/lua";
import powershell from "react-syntax-highlighter/dist/cjs/languages/prism/powershell";
import { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { Copy } from "lucide-react";

SyntaxHighlighter.registerLanguage("tsx", tsx);
SyntaxHighlighter.registerLanguage("typescript", typescript);
SyntaxHighlighter.registerLanguage("scss", scss);
SyntaxHighlighter.registerLanguage("bash", bash);
SyntaxHighlighter.registerLanguage("markdown", markdown);
SyntaxHighlighter.registerLanguage("json", json);
SyntaxHighlighter.registerLanguage("lua", lua);
SyntaxHighlighter.registerLanguage("powershell", powershell);

interface MarkdownRenderProps {
  mdString: string;
}

type CodeProps = {
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
};

export default function MarkdownRender({ mdString }: MarkdownRenderProps) {
  return (
    <ReactMarkdown
      components={{
        code({ inline, className, ...props }: CodeProps) {
          const hasLang = /language-(\w+)/.exec(className || "");
          return !inline && hasLang ? (
            <SyntaxHighlighter
              style={darcula}
              language={hasLang[1]}
              PreTag="div"
              className="mockup-code scrollbar-thin scrollbar-track-base-content/5 scrollbar-thumb-base-content/40 scrollbar-track-rounded-md scrollbar-thumb-rounded"
              showLineNumbers={true}
              useInlineStyles={true}
            >
              {String(props.children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          ) : (
            <code className={className} {...props} />
          );
        },
        pre: (pre) => {
          const codeChunk = (pre as any).node.children[0].children[0]
            .value as string;

          // eslint-disable-next-line react-hooks/rules-of-hooks
          const [copyTip, setCopyTip] = useState("Copy code");

          const language = (pre as any).children[0]?.props.className.replace(
            /language-/g,
            ""
          ) as string;

          return (
            <div className="relative overflow-x-hidden">
              <button
                className="tooltip tooltip-left absolute z-20 mr-2 mt-5 p-1 rounded-lg bg-base-content/40 text-xs text-base-300 right-0"
                data-tip={copyTip}
              >
                <CopyToClipboard
                  text={codeChunk}
                  onCopy={async () => {
                    setCopyTip("Copied");
                    await new Promise((resolve) => setTimeout(resolve, 500));
                    setCopyTip(`Copy code`);
                  }}
                >
                  <Copy className="h-5 w-5 cursor-pointer hover:text-green-400" />
                </CopyToClipboard>
              </button>
              <span
                style={{
                  bottom: 0,
                  right: 0,
                }}
                className="absolute z-20 mb-5 mr-1 rounded-lg bg-base-content/40 p-1 text-xs text-base-300 backdrop-blur-sm"
              >
                {language}
              </span>
              <pre {...pre}></pre>
            </div>
          );
        },
      }}
    >
      {mdString}
    </ReactMarkdown>
  );
}
