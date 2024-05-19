import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import CareTakerPage from "@/app/users/CaretakerPage";
import AdminPage from "@/app/users/AdminPage";
import { redirect } from "next/navigation";
export default async function Page() {
  const session = await getServerSession(options);
  if (session?.user.isContactVerified !== true) {
    redirect(
      `/auth/accountConfirmation?userID=${session?.user.id}&role=${session?.user.role}`
    );
  } else if (session?.user.role === "EM-202") {
    return <CareTakerPage />;
  } else if (session?.user.role === "EM-203") {
    return <AdminPage />;
  } else {
    redirect(`/user/${session?.user.id}`);
  }
}
