import Link from "next/link";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[20rem] grid-cols-1 md:grid-cols-3 gap-4 mx-auto ",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  header,
  icon,
  link,
  tag,
  shortDesc,
}: {
  className?: string;
  title?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  link?: string;
  tag?: string
  shortDesc?: string;
}) => {

  return (
    <div
      className={cn(
        "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-primary-foreground border justify-between flex flex-col space-y-4",
        className
      )}
    >
      {header}
      <div className="group-hover/bento:translate-x-2 transition duration-200">
        <span className="text-4xl">{icon}</span>
        <div className="text-2xl line-clamp-1">
          {link ? (
            <Link href={link}>
              <div className="font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-2 mt-2 hover:text-green-400 dark:hover:text-green-400 cursor-pointer">
                {title}
              </div>
            </Link>
          ) : (
            <div className="font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-2 mt-2">
              {title}
            </div>
          )}
        </div>
        <div className="font-sans font-normal text-neutral-600 text-xs dark:text-neutral-300 line-clamp-1">
          {shortDesc}
        </div>
        <div className="mt-1">
          <Badge href={`${process.env.BASE_URL}/tag/${tag}`}>
            #{tag}
          </Badge>
        </div>
      </div>
    </div>
  );
};
