"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import EditorMenuBar from "./editor-menu-bar";
import Link from "@tiptap/extension-link";
import CodeBlock from "@tiptap/extension-code-block";
import Image from "@tiptap/extension-image";

const Editor = ({
  content,
  onChange,
}: {
  content: string;
  onChange: (richtext: string) => void;
}) => {
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
      onChange(editor.getHTML());
    },
    content: content,
    editorProps: {
      attributes: {
        class: "rounded-md border border-input w-full outline-none p-2",
      },
    },
  });

  return (
    <div className="flex-1 w-full">
      <div className="flex items-center justify-between gap-2 mb-4">
        {editor && <EditorMenuBar editor={editor} />}
      </div>
      <div className="prose dark:prose-invert max-w-full flex-1">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default Editor;
