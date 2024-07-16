import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import AdminPage from "@/app/users/AdminPage";
export default async function Page() {
  const session = await getServerSession(options);
  if (session?.user.role === "EM-203") {
    return <AdminPage />;
  } else {
    return <p>Not allowed to go beyond this point</p>;
  }
}
