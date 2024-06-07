import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

const TagPicker = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className={cn(
            "w-full justify-between",
            !field.value && "text-muted-foreground"
          )}
        >
          {field.value
            ? tags.find((tag) => tag.tagName === field.value)?.tagName
            : "Select tag"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search tag..." />
          <CommandEmpty>No tag found.</CommandEmpty>
          <CommandGroup>
            {tags.map((tag) => (
              <CommandItem
                value={tag.tagName}
                key={tag.tagName}
                onSelect={() => {
                  form.setValue("tag", tag.tagName);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    tag.tagName === field.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {tag.tagName}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default TagPicker;
