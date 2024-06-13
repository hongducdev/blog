"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";

const formSchema = z.object({
  tag: z.string().min(1, {
    message: "Tag must be at least 1 character.",
  }),
});

const CreateTag = () => {
  const [isLoadingCreateTag, setIsLoadingCreateTag] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tag: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    setIsLoadingCreateTag(true);
    try {
      const response = await axios.post("/api/tags", {
        name: values.tag,
      });

      if (response.status === 200) {
        toast({
          title: "Success",
          description: "Tag created successfully",
        });
        form.reset();
      } else {
        toast({
          title: "Error",
          description: response.data.error || "An error occurred",
        });
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast({
          title: "Error",
          description: error.response?.data?.error || "An error occurred",
        });
      } else if (error instanceof Error) {
        toast({
          title: "Error",
          description: error.message || "An unknown error occurred",
        });
      } else {
        toast({
          title: "Error",
          description: "An unknown error occurred",
        });
      }
    } finally {
      setIsLoadingCreateTag(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="tag"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Create tag</FormLabel>
              <FormControl>
                <Input placeholder="Create a new tag" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoadingCreateTag}>
          {isLoadingCreateTag ? "Loading..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
};

export default CreateTag;
