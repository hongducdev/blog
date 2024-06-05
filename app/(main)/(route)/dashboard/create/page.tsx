import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/config/authOptions";
import CreatePostForm from "./_components/create-post-form";

const CreatePage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/login");
  }

  return <CreatePostForm />;
};

export default CreatePage;
