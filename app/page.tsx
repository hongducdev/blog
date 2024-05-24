import Image from "next/image";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { BlogPost } from "@/@types/schema";
import { getPublishedPosts } from "@/apis";

export const revalidate = 60;

const fetchPosts = async () => {
  try {
    const response = await getPublishedPosts();
    return response;
  } catch (error) {
    console.error(error);
  }
};

const MainPage = async () => {
  const posts = await fetchPosts();

  return (
    <div className="max-w-7xl mx-auto px-2 lg:px-0">
      <BentoGrid>
        {posts.map((post: BlogPost, i: number) => (
          <BentoGridItem
            key={post.slug}
            header={
              post.cover === "" ? (
                <Skeleton />
              ) : (
                <div className="relative h-full w-full">
                  <Image
                    src={post.cover}
                    alt={post.title}
                    layout="fill"
                    className="object-cover rounded-xl"
                  />
                </div>
              )
            }
            title={post.title}
            description={post.description}
            link={`/blog/${post.slug}`}
            tags={post.tags}
            icon={
              post.icon && post.icon.startsWith("http") ? (
                <Image
                  src={post.icon}
                  alt={post.title}
                  width={20}
                  height={20}
                />
              ) : (
                <span>{post.icon}</span>
              )
            }
            className={i === 3 || i === 6 ? "md:col-span-2" : ""}
          />
        ))}
      </BentoGrid>
    </div>
  );
};

export default MainPage;

const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
);
