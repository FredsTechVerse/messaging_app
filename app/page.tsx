import { User, columns } from "./columns";
import { DataTable } from "@/app/components/custom";
import { ActionBtns } from "@/app/sections";
import { findAllUsers } from "@/lib/userActions";

export default async function Page() {
  const data: any = await findAllUsers();
  const userData = await JSON.parse(data);
  return (
    <section className="py-5">
      <div className="w-full">
        <div className="flex flex-col tablet:flex-row items-center w-full justify-between pb-10 ">
          <h1 className="text-3xl font-bold">INUA COMRADE</h1>
          <ActionBtns />
        </div>

        <DataTable columns={columns} data={userData.payload} />
      </div>
    </section>
  );
}
