import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import CreatePostForm from "./_components/create-post-form";
import { redirect } from "next/navigation";

const CreatePage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/login");
  }

  return <CreatePostForm />;
};

export default CreatePage;
