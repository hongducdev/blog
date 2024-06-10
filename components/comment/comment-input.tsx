"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";
import { Loader, Send } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import { toast } from "../ui/use-toast";
import CommentItem from "./comment-item";

interface CommentInputProps {
  postId: string;
  slug: string;
}

const formSchema = z.object({
  content: z.string().min(2, {
    message: "Comment must be at least 2 characters long",
  }),
});

const CommentInput = ({ postId, slug }: CommentInputProps) => {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [comments, setComments] = useState<any[]>([]);

  const fetchComments = async (slug: string) => {
    const response = await axios.get(`/api/posts/${slug}`);
    setComments(response.data?.comments);
  };

  useEffect(() => {
    fetchComments(slug);
  }, [slug]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/comment", {
        postId,
        content: values.content,
        emailUser: session?.user?.email,
      });

      if (response.status === 201) {
        form.reset();
        toast({
          title: "Comment posted",
          description: "Your comment has been successfully posted.",
        });
        fetchComments(slug);
      }
    } catch (error) {
      toast({
        title: "An error occurred",
        description: "Failed to post comment",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!session) {
    return (
      <div className="text-center">
        <p className="">
          You need to be logged in to comment.{" "}
          <Link href="/login" className="font-medium underline">
            Login
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex gap-2 items-start">
        <Avatar>
          <AvatarImage
            src={session.user?.image || "https://github.com/shadcn.png"}
          />
          <AvatarFallback>
            {session.user?.name?.charAt(0) || "?"}
          </AvatarFallback>
        </Avatar>
        <div className="border border-input rounded-md w-full flex items-center">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex items-center w-full"
            >
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Add a comment..."
                        className="w-full border-none ring-0 ring-offset-0 outline-none focus:outline-none focus:ring-0 focus:ring-offset-0"
                        type="text"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button variant="ghost" type="submit">
                {isLoading ? (
                  <Loader className="w-5 h-5" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-3">
        {comments.map(
          (comment: {
            id: string;
            content: string;
            createdAt: string;
            emailUser: string;
            user: {
              name: string;
              image: string;
            };
          }) => (
            <CommentItem key={comment.id} comment={comment} />
          )
        )}
      </div>
    </div>
  );
};

export default CommentInput;
