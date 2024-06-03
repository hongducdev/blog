import { Loader } from "lucide-react";

const Loading = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <div className="animate-spin text-muted-foreground p-10">
        <Loader className="w-8 h-8" />
      </div>
    </div>
  );
};

export default Loading;
