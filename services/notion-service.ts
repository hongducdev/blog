import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import { BlogPost, PostPage, Tag } from "@/@types/schema";

export default class NotionService {
  private client: Client;
  private n2m: NotionToMarkdown;

  constructor() {
    this.client = new Client({ auth: process.env.NOTION_ACCESS_TOKEN });
    this.n2m = new NotionToMarkdown({ notionClient: this.client });
  }

  private database = process.env.NOTION_BLOG_DATABASE_ID ?? "";

  async getPublishedPosts(): Promise<BlogPost[]> {
    const response = await this.client.databases.query({
      database_id: this.database,
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
    const response = await this.client.databases.query({
      database_id: this.database,
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
      // return 404
      throw new Error("Post not found");
    }

    const page = response.results[0];
    const mdBlocks = await this.n2m.pageToMarkdown(page.id);
    const markdown = this.n2m.toMarkdownString(mdBlocks).parent;
    const post = NotionService.pageToPostTransformer(page);

    return { post, markdown };
  }


  async updatePostViews(id: string, views: number): Promise<void> {
    await this.client.pages.update({
      page_id: id,
      properties: {
        Views: {
          number: views,
        },
      },
    });
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

    const tags = page.properties.Tags.multi_select.map((tag: any) => ({
      id: tag.id,
      name: tag.name,
      color: tag.color,
    }));

    return {
      id: page.id,
      slug: page.properties.Slug.formula.string,
      icon,
      cover,
      title: page.properties.Name.title[0]?.plain_text ?? "",
      tags,
      description: page.properties.Description.rich_text[0]?.plain_text ?? "",
      date: page.properties.Updated.last_edited_time,
      views: page.properties.Views?.number ?? 0,
    };
  }
}
