import { User, columns } from "./columns";
import { DataTable } from "@/app/components/custom";
import { ActionBtns } from "@/app/sections";
import { findAllUsers } from "@/lib/userActions";
import { Badge } from "@/components/ui/badge";

export default async function Page() {
  const data = await findAllUsers();
  const userData = await JSON.parse(data);
  return (
    <section className="py-5 pb-10">
      <div className="w-full">
        <div className="flex flex-col tablet:flex-row items-center w-full justify-between pb-5 ">
          <h1 className="text-3xl font-bold">INUA COMRADE</h1>
          <ActionBtns />
        </div>
        <h2 className="flex items-center self-end w-max ml-auto gap-2 ">
          Total users
          <Badge className="bg-primary text-white">
            {userData.payload.length}
          </Badge>
        </h2>

        <DataTable columns={columns} data={userData.payload} />
      </div>
    </section>
  );
}
