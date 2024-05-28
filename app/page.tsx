import { Tag } from "@/@types/schema";
import { getPublishedPosts, getTags } from "@/apis";
import { Badge } from "@/components/ui/badge";
import ListPostCard from "./_components/list-post-card";

export const revalidate = 60;

const fetchPosts = async () => {
  try {
    const response = await getPublishedPosts();
    return response;
  } catch (error) {
    console.error(error);
  }
};

const fetchTags = async () => {
  try {
    const response = await getTags();
    return response;
  } catch (error) {
    console.error(error);
  }
};

const MainPage = async () => {
  const posts = await fetchPosts();
  const tags = await fetchTags();

  return (
    <div className="max-w-7xl mx-auto px-2 lg:px-0">
      <div className="my-4 flex flex-row space-x-3">
        {tags.map((tag: Tag) => (
          <Badge
            key={tag.id}
            className="text-base"
            href={`${process.env.BASE_URL}/tag/${tag.name}`}
          >
            #{tag.name}
          </Badge>
        ))}
      </div>
      <ListPostCard posts={posts} />
    </div>
  );
};

export default MainPage;
