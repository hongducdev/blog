"use client";
import { useCallback, useState } from "react";
import { Editor } from "@tiptap/react";
import { Button } from "./ui/button";
import {
  Bold,
  Braces,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Italic,
  List,
  ListOrdered,
  Quote,
  Strikethrough,
  Undo,
  Image as ImageIcon,
  Link as LinkIcon,
} from "lucide-react";
import TiptapLink from "./tiptap-link";

interface EditorMenuBarProps {
  editor: Editor | null;
}

const EditorMenuBar = ({ editor }: EditorMenuBarProps) => {
  const addImage = useCallback(() => {
    if (!editor) return;
    const url = window.prompt("Enter image URL");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2 border border-input rounded-lg w-full flex-1">
      <Button
        variant="ghost"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`${
          editor.isActive("bold") ? "bg-primary text-primary-foreground" : ""
        }`}
      >
        <Bold className="w-6 h-6" />
      </Button>

      <Button
        variant="ghost"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`${
          editor.isActive("italic") ? "bg-primary text-primary-foreground" : ""
        }`}
      >
        <Italic className="w-6 h-6" />
      </Button>

      <Button
        variant="ghost"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={`${
          editor.isActive("strike") ? "bg-primary text-primary-foreground" : ""
        }`}
      >
        <Strikethrough className="w-6 h-6" />
      </Button>

      <Button
        variant="ghost"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        disabled={
          !editor.can().chain().focus().toggleHeading({ level: 1 }).run()
        }
      >
        <Heading1 className="w-6 h-6" />
      </Button>

      <Button
        variant="ghost"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        disabled={
          !editor.can().chain().focus().toggleHeading({ level: 2 }).run()
        }
      >
        <Heading2 className="w-6 h-6" />
      </Button>

      <Button
        variant="ghost"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        disabled={
          !editor.can().chain().focus().toggleHeading({ level: 3 }).run()
        }
      >
        <Heading3 className="w-6 h-6" />
      </Button>

      <Button
        variant="ghost"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        disabled={!editor.can().chain().focus().toggleBulletList().run()}
      >
        <List className="w-6 h-6" />
      </Button>

      <Button
        variant="ghost"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        disabled={!editor.can().chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered className="w-6 h-6" />
      </Button>

      <Button
        variant="ghost"
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
      >
        <Code className="w-6 h-6" />
      </Button>

      <Button
        variant="ghost"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        disabled={!editor.can().chain().focus().toggleCodeBlock().run()}
      >
        <Braces className="w-6 h-6" />
      </Button>

      <Button
        variant="ghost"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        disabled={!editor.can().chain().focus().toggleBlockquote().run()}
      >
        <Quote className="w-6 h-6" />
      </Button>

      <Button
        variant="ghost"
        onClick={addImage}
        className={
          editor.isActive("image") ? "bg-primary text-primary-foreground" : ""
        }
      >
        <ImageIcon className="w-6 h-6" />
      </Button>

      <TiptapLink editor={editor} />
    </div>
  );
};

export default EditorMenuBar;
