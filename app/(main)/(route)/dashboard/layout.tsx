import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";
import { authOptions } from "@/config/authOptions";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/login");
  } else if (session.user.role !== "ADMIN") {
    notFound();
  }

  return <div>{children}</div>;
};

export default DashboardLayout;
