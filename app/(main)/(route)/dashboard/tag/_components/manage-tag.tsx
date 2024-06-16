"use client";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Check, Pencil, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

interface Tag {
  id: string;
  tagName: string;
  posts: { id: string }[];
}

const ManageTag = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [editTagId, setEditTagId] = useState<string | null>(null);
  const [editTagName, setEditTagName] = useState<string>("");

  useEffect(() => {
    const fetchTags = async () => {
      const response = await axios.get("/api/tags");
      if (response.status === 200) {
        setTags(response.data);
      }
    };

    fetchTags();
  }, []);

  const handleEdit = (tag: Tag) => {
    setEditTagId(tag.id);
    setEditTagName(tag.tagName);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditTagName(e.target.value);
  };

  const handleEditSubmit = async () => {
    try {
      const response = await axios.put(`/api/tags`, {
        id: editTagId,
        newName: editTagName,
      });
      if (response.status === 200) {
        setTags(
          tags.map((tag) =>
            tag.id === editTagId ? { ...tag, tagName: editTagName } : tag
          )
        );
        setEditTagId(null);
        toast({ title: "Tag updated successfully." });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while updating the tag.",
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await axios.delete(`/api/tags`, { data: { id } });
      if (response.status === 200) {
        setTags(tags.filter((tag) => tag.id !== id));
        toast({ title: "Tag deleted successfully." });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while deleting the tag.",
      });
    }
  };
  
  return (
    <Table>
      <TableCaption>A list of your recent tags.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">STT</TableHead>
          <TableHead>ID</TableHead>
          <TableHead>Tag</TableHead>
          <TableHead>Số lượng bài viết</TableHead>
          <TableHead>Tác vụ</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tags.map((tag, index) => (
          <TableRow key={tag.id}>
            <TableCell className="font-medium">{index + 1}</TableCell>
            <TableCell>{tag.id}</TableCell>
            <TableCell>
              {editTagId === tag.id ? (
                <Input
                  value={editTagName}
                  onChange={handleEditChange}
                  onBlur={handleEditSubmit}
                  onKeyDown={(e) => e.key === "Enter" && handleEditSubmit()}
                  autoFocus
                />
              ) : (
                tag.tagName
              )}
            </TableCell>
            <TableCell>{tag.posts.length}</TableCell>
            <TableCell>
              <div className="flex items-center space-x-3">
                <Button onClick={() => handleEdit(tag)}>
                  {editTagId === tag.id ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Pencil className="w-4 h-4" />
                  )}
                </Button>

                <AlertDialog>
                  <AlertDialogTrigger>
                    <Button variant="destructive">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Xác nhận xóa tag {tag.tagName}
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Bạn có chắc chắn muốn xóa tag này không?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Hủy</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(tag.id)}>
                        Xóa
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ManageTag;
