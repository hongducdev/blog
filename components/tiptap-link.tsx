"use client"
import { useCallback, useState } from "react";
import { Editor } from "@tiptap/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "./ui/button";
import { LinkIcon } from "lucide-react";

interface TiptapLinkProps {
  editor: Editor | null;
}

const TiptapLink = ({editor}: TiptapLinkProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");

  const openLinkDialog = useCallback(() => {
    if (!editor) return;
    const previousUrl = editor.getAttributes("link").href;
    setLinkUrl(previousUrl || "");
    setIsDialogOpen(true);
  }, [editor]);

  const handleLinkSave = useCallback(() => {
    if (!editor) return;

    // empty
    if (linkUrl === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    } else {
      // update link
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: linkUrl })
        .run();
    }

    setIsDialogOpen(false);
  }, [editor, linkUrl]);

  if (!editor) {
    return null;
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className={
            editor.isActive("link") ? "bg-primary text-primary-foreground" : ""
          }
          onClick={openLinkDialog}
        >
          <LinkIcon className="w-6 h-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Link</DialogTitle>
          <DialogDescription>Add a link to your text</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="link" className="text-right">
            URL
          </Label>
          <Input
            id="link"
            type="url"
            placeholder="https://example.com"
            className="col-span-3"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button onClick={handleLinkSave}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TiptapLink;
