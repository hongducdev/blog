"use client"
import { useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

const CopyButton = ({ text }: { text: string }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(text).then(() => {
      alert("Copied to clipboard");
    });
  };

  return (
    <button onClick={copyToClipboard} className="copy-button">
      Copy
    </button>
  );
};

const CodeBlock = ({ content }: { content: string }) => {
  useEffect(() => {
    document.querySelectorAll("pre code").forEach((block) => {
      const copyButton = document.createElement("button");
      copyButton.innerText = "Copy";
      copyButton.className = "copy-button";
      copyButton.addEventListener("click", () => {
        navigator.clipboard.writeText(block.textContent || "");
        alert("Copied to clipboard");
      });

      const pre = block.parentElement;
      pre.style.position = "relative";
      copyButton.style.position = "absolute";
      copyButton.style.top = "10px";
      copyButton.style.right = "10px";
      pre.appendChild(copyButton);
    });
  }, []);

  return (
    <SyntaxHighlighter language="javascript" style={dracula}>
      {content}
    </SyntaxHighlighter>
  );
};

export default CodeBlock;
