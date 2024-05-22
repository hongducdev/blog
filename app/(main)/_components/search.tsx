"use client";
import { useState } from "react";
import { BlogPost } from "@/@types/schema";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

interface SearchProps {
  posts: BlogPost[];
}

const Search = ({ posts }: SearchProps) => {
  const [value, setValue] = useState("");

  return (
    <div>
      <div className="relative">
        <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search" className="pl-8" />
      </div>
    </div>
  );
};

export default Search;
