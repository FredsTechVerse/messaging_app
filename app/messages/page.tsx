import { columns } from "./columns";
import { MessageTable } from "@/app/components/custom";
import ActionBtns from "./ActionBtns";
import { findAllMessages } from "@/lib/messageActions";

export default async function Page() {
  const data: any = await findAllMessages();
  const messageData = await JSON.parse(data);
  return (
    <section className="py-12">
      <div className="w-full">
        <div className="flex items-center w-full justify-between">
          <h1 className="text-3xl font-bold">MESSAGES</h1>
          <ActionBtns />
        </div>

        <MessageTable columns={columns} data={messageData.payload} />
      </div>
    </section>
  );
}
