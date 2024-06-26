"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Post } from "@prisma/client";

const SearchCommand = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/posts");
      const data = await res.json();
      setPosts(data);
    };
    fetchPosts();
  }, []);

  return (
    <>
      <Button
        variant="outline"
        className={cn(
          "relative h-10 w-full justify-start rounded-[0.5rem] bg-background text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-64"
        )}
        onClick={() => setOpen(true)}
      >
        <span className="hidden lg:inline-flex">
          Tìm kiếm bài viết...
        </span>
        <span className="inline-flex lg:hidden">Tìm kiếm</span>
        <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-7 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Nhập từ khóa để tìm kiếm..." />
        <CommandList>
          <CommandEmpty>Không tìm thấy kết quả.</CommandEmpty>
          <CommandGroup title="Posts">
            {posts.map((post: Post) => (
              <CommandItem
                key={post.slug}
                title={post.title}
                value={post.title}
                onSelect={() => {
                  router.push(`/blog/${post.slug}`);
                  setOpen(false);
                }}
              >
                <div className="flex items-center space-x-3">
                  <Image
                    src={post.thumbnail}
                    alt={post.title}
                    width={70}
                    height={20}
                    className="rounded"
                  />
                  <div>
                    <span className="font-semibold text-lg">{post.title}</span>
                    <p className="text-xs line-clamp-1">{post.shortDesc}</p>
                  </div>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default SearchCommand;
