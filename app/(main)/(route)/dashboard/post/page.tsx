"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Post } from "@prisma/client";
import Link from "next/link";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import Image from "next/image";
import { Pencil, Trash2 } from "lucide-react";

const PostDashboardPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get("/api/posts");
      if (response.status === 200) {
        setPosts(response.data);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <Button>
        <Link href="/dashboard/post/create">Create Post</Link>
      </Button>
      <div className="">
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">STT</TableHead>
              <TableHead>Thumbnail</TableHead>
              <TableHead>Tiêu đề</TableHead>
              <TableHead>Tác vụ</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.map((post, index) => (
              <TableRow key={post.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <Image
                    src={post.thumbnail}
                    alt={post.title}
                    width="150"
                    height="50"
                    className="object-cover rounded-lg"
                  />
                </TableCell>
                <TableCell>{post.title}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <Button>
                      <Link href={`/dashboard/post/edit/${post.slug}`}>
                        <Pencil className="w-4 h-4" />
                      </Link>
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
                            Xác nhận xóa bài viết {post.title}
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Bạn có chắc chắn muốn xóa tag này không?
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Hủy</AlertDialogCancel>
                          <AlertDialogAction onClick={() => {}}>
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
      </div>
    </div>
  );
};

export default PostDashboardPage;
