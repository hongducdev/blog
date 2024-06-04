"use client";

import { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import EditorMenuBar from "./editor-menu-bar";
import { Button } from "./ui/button";
import Link from "@tiptap/extension-link";
import CodeBlock from "@tiptap/extension-code-block";
import Image from "@tiptap/extension-image";

const Editor = () => {
  const [editorState, setEditorState] = useState("<p>Hello World! 🌎️</p>");

  const editor = useEditor({
    autofocus: true,
    extensions: [
      StarterKit,
      Link.configure({
        autolink: true,
        openOnClick: true,
      }),
      CodeBlock,
      Image,
    ],
    onUpdate: ({ editor }) => {
      setEditorState(editor.getHTML());
    },
    content: editorState,
  });

  return (
    <>
      <div className="flex items-center justify-between gap-2">
        {editor && <EditorMenuBar editor={editor} />}
        <Button>Saved</Button>
      </div>
      <div className="prose dark:prose-invert">
        <EditorContent editor={editor} />
      </div>
    </>
  );
};

export default Editor;
