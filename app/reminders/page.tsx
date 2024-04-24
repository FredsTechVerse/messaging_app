import { columns } from "./columns";
import { MessageTable } from "@/app/components/custom";
import { findAllReminders } from "@/lib/messageActions";
import { Badge } from "@/components/ui/badge";
export default async function Page() {
  const data: string = await findAllReminders();
  const reminderData = await JSON.parse(data);
  return (
    <section className="py-5 pb-10">
      <div className="w-full ">
        <div className="flex items-center w-full justify-between pb-10">
          <h1 className="text-3xl font-bold">REMINDERS</h1>
        </div>
        <h2 className="flex items-center self-end w-max ml-auto gap-2 ">
          Total reminders
          <Badge className="bg-primary text-white">
            {reminderData.payload.length}
          </Badge>
        </h2>

        <MessageTable columns={columns} data={reminderData.payload} />
      </div>
    </section>
  );
}
