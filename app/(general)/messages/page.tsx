import { columns } from "./columns";
import { MessageTable } from "@/app/components/custom";
import ActionBtns from "./ActionBtns";
import { findAllMessages } from "@/lib/messageActions";
import { Badge } from "@/components/ui/badge";
export default async function Page() {
  const data: any = await findAllMessages();
  const messageData = await JSON.parse(data);
  return (
    <section className="py-5 pb-10">
      <div className="w-full ">
        <div className="flex items-center w-full justify-between pb-10">
          <h1 className="text-3xl font-bold">MESSAGES</h1>
          <ActionBtns />
        </div>
        <h2 className="flex items-center self-end w-max ml-auto gap-2 ">
          Total messages
          <Badge className="bg-primary text-white">
            {messageData.payload.length}
          </Badge>
        </h2>
        <MessageTable columns={columns} data={messageData.payload} />
      </div>
    </section>
  );
}
