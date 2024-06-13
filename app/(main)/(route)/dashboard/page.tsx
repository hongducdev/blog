import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TagDashBoardPage from "./tag/page";
import PostDashboardPage from "./post/page";

const DashboardPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-2 xl:px-0">
      <Tabs defaultValue="post" className="w-full">
        <TabsList>
          <TabsTrigger value="post">Post</TabsTrigger>
          <TabsTrigger value="tag">Tag</TabsTrigger>
        </TabsList>
        <TabsContent value="post">
          <PostDashboardPage />
        </TabsContent>
        <TabsContent value="tag">
          <TagDashBoardPage />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardPage;
