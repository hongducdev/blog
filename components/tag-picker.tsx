"use client";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";

const initialTags = ["Windows", "Linux", "OS", "Terminal"];

interface TagPickerProps {
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
}

const TagPicker = ({ selectedTags, onTagsChange }: TagPickerProps) => {
  const [tags, setTags] = useState<string[]>(initialTags);
  const [inputValue, setInputValue] = useState("");
  const [showPopover, setShowPopover] = useState(false);

  useEffect(() => {
    setShowPopover(inputValue.length > 0);
  }, [inputValue]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
  };

  const handleTagClick = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      const newSelectedTags = [...selectedTags, tag];
      onTagsChange(newSelectedTags);
      setInputValue("");
      setShowPopover(false);
    }
  };

  const handleCreateNewTag = () => {
    if (inputValue && !tags.includes(inputValue)) {
      const newTags = [...tags, inputValue];
      setTags(newTags);
      const newSelectedTags = [...selectedTags, inputValue];
      onTagsChange(newSelectedTags);
      setInputValue("");
      setShowPopover(false);
    }
  };

  const handleRemoveTag = (tag: string) => {
    const newSelectedTags = selectedTags.filter((t) => t !== tag);
    onTagsChange(newSelectedTags);
  };

  const filteredTags = tags.filter(
    (tag) =>
      tag.toLowerCase().includes(inputValue.toLowerCase()) &&
      !selectedTags.includes(tag)
  );

  return (
    <div className="relative">
      <Popover>
        <PopoverTrigger asChild>
          <Input
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter tag"
          />
        </PopoverTrigger>
        <PopoverContent>
          {filteredTags.length > 0 ? (
            <ul>
              {filteredTags.map((tag) => (
                <li
                  key={tag}
                  className="cursor-pointer"
                  onClick={() => handleTagClick(tag)}
                >
                  {tag}
                </li>
              ))}
            </ul>
          ) : (
            inputValue && (
              <div className="cursor-pointer" onClick={handleCreateNewTag}>
                Create new tag: <Badge>{inputValue}</Badge>
              </div>
            )
          )}
        </PopoverContent>
      </Popover>
      <div className="mt-2 flex items-center gap-3">
        {selectedTags.map((tag) => (
          <Badge
            key={tag}
            className="inline-flex items-center gap-2"
            variant="secondary"
          >
            {tag}
            <button
              onClick={() => handleRemoveTag(tag)}
              className="ml-1 text-red-500"
            >
              &times;
            </button>
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default TagPicker;
