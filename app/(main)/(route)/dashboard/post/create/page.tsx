import { Metadata } from "next";
import CreateForm from "./_component/create-form";

export const metadata: Metadata = {
  title: "Create",
  description: "Create a new post",
};

const CreatePage = () => {
  return <CreateForm />;
};

export default CreatePage;
