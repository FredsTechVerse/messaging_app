import { User, columns } from "./columns";
import { DataTable } from "@/app/components/custom";
import ActionBtns from "./ActionBtns";
import { findAllUsers } from "@/lib/userActions";

export default async function Page() {
  const data: any = await findAllUsers();
  const userData = await JSON.parse(data);
  return (
    <section className="py-12">
      <div className="w-full">
        <div className="flex items-center w-full justify-between">
          <h1 className="text-3xl font-bold">MESSAGES</h1>
          <ActionBtns />
        </div>

        <DataTable columns={columns} data={userData.payload} />
      </div>
    </section>
  );
}
