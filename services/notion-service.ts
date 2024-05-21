import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import { BlogPost, PostPage } from "@/@types/schema";

export default class NotionService {
  client: Client;
  n2m: NotionToMarkdown;

  constructor() {
    this.client = new Client({ auth: process.env.NOTION_ACCESS_TOKEN });
    this.n2m = new NotionToMarkdown({ notionClient: this.client });
  }

  database = process.env.NOTION_BLOG_DATABASE_ID ?? "";

  async getPublishedPosts(): Promise<BlogPost[]> {
    const database = process.env.NOTION_BLOG_DATABASE_ID ?? "";

    // List all posts in the database
    const response = await this.client.databases.query({
      database_id: database,
      filter: {
        property: "Published",
        checkbox: {
          equals: true,
        },
      },
      sorts: [
        {
          property: "Created",
          direction: "descending",
        },
      ],
    });

    return response.results.map((res) => {
      return NotionService.pageToPostTransformer(res);
    });
  }

  async getSingleBlogPost(slug: string): Promise<PostPage> {
    let post, markdown;

    const database = process.env.NOTION_BLOG_DATABASE_ID ?? "";

    // Get the page by slug
    const response = await this.client.databases.query({
      database_id: database,
      filter: {
        property: "Slug",
        formula: {
          string: {
            equals: slug,
          },
        },
      },
    });

    if (!response.results[0]) {
      throw new Error("Post not found");
    }

    const page = response.results[0];

    const mdBlocks = await this.n2m.pageToMarkdown(page.id);
    markdown = this.n2m.toMarkdownString(mdBlocks).parent;
    post = NotionService.pageToPostTransformer(page);

    return { post, markdown };
  }

  private static pageToPostTransformer(page: any): BlogPost {
    let cover = "";
    if (page.cover) {
      switch (page.cover.type) {
        case "external":
          cover = page.cover.external.url;
          break;
        case "file":
          cover = page.cover.file.url;
          break;
        default:
          cover = "";
      }
    }

    let icon = "";
    if (page.icon) {
      switch (page.icon.type) {
        case "emoji":
          icon = page.icon.emoji;
          break;
        case "external":
          icon = page.icon.external.url;
          break;
        case "file":
          icon = page.icon.file.url;
          break;
        default:
          icon = "";
      }
    }

    return {
      id: page.id,
      slug: page.properties.Slug.formula.string,
      icon,
      cover,
      title: page.properties.Name.title[0]?.plain_text ?? "",
      tags: page.properties.Tags.multi_select,
      description: page.properties.Description.rich_text[0]?.plain_text ?? "",
      date: page.properties.Updated.last_edited_time,
    };
  }
}
