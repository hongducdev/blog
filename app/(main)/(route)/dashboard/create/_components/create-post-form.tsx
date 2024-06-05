"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import slugify from "slugify";
import Editor from "@/components/editor";
import UploadImage from "@/components/upload-image";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import IconPicker from "@/components/icon-picker";
import { Smile } from "lucide-react";
import TagPicker from "@/components/tag-picker";

const formSchema = z.object({
  thumbnail: z.string().url({
    message: "Thumbnail must be a valid URL.",
  }),
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  slug: z.string().min(5, {
    message: "Slug must be at least 5 characters.",
  }),
  icon: z.string().min(1, {
    message: "Icon must be at least 1 character.",
  }),
  tags: z.array(z.string()).min(1, {
    message: "At least one tag is required.",
  }),
  content: z.string().min(10, {
    message: "Content must be at least 10 characters.",
  }),
});

const CreatePostForm = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      tags: [],
    },
  });

  const generateSlug = (title: string) => {
    return slugify(title, {
      replacement: "-",
      locale: "vi",
      lower: true,
      strict: false,
      trim: true,
    });
  };

  const title = useWatch({
    control: form.control,
    name: "title",
  });

  useEffect(() => {
    if (title) {
      form.setValue("slug", generateSlug(title));
    }
  }, [title, form]);

  useEffect(() => {
    form.setValue("tags", selectedTags);
  }, [selectedTags, form]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <div className="px-2 py-10 flex gap-2 max-w-7xl mx-auto">
      <div className="w-[70%]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="thumbnail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Thumbnail</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="icon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Icon</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <IconPicker value={field.value} onChange={field.onChange}>
                        <div className="flex items-center gap-2 cursor-pointer">
                          {field.value ? (
                            <span className="text-2xl">{field.value}</span>
                          ) : (
                            <Smile className="w-6 h-6" />
                          )}
                        </div>
                      </IconPicker>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input placeholder="Slug" {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <TagPicker
                    selectedTags={selectedTags}
                    onTagsChange={setSelectedTags}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Editor content={field.value} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
      <div className="w-[30%]">
        <UploadImage />
      </div>
    </div>
  );
};

export default CreatePostForm;
