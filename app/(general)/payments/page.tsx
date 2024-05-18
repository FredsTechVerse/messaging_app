import { findAllPayments } from "@/lib/paymentActions";
import ActionBtns from "./ActionBtns";
import { columns } from "./columns";
import { DataTable } from "@/app/components/custom";
import { Badge } from "@/components/ui/badge";
import { calculateTotalAmount } from "@/lib/calculations";

export default async function Page() {
  const data = await findAllPayments();
  const payment = await JSON.parse(data);
  const paymentInformation: PaymentInfo[] = payment?.payload;
  const totalPayments = calculateTotalAmount(paymentInformation);

  return (
    <section className="py-5 pb-10 w-full px-2">
      <section className="flex flex-col tablet:flex-row items-center w-full justify-between pb-5 ">
        <h1 className="text-3xl font-bold">PAYMENTS</h1>
        <ActionBtns />
      </section>

      <div className="flex-row-centered mr-auto gap-2">
        <h2 className="flex items-center self-end w-max gap-2 ">
          Records
          <Badge className="bg-slate-800 text-white">
            {paymentInformation?.length}
          </Badge>
        </h2>
        <h2 className="flex items-center self-end w-max gap-2 ">
          Total Payments
          <Badge className="bg-slate-800 text-white">{totalPayments}</Badge>
        </h2>
      </div>

      <DataTable
        columns={columns}
        data={paymentInformation}
        searchType="payment"
      />
    </section>
  );
}
