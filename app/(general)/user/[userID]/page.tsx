import { CombinedPaymentColumns } from "./columns";
import { DataTable, TableHeading } from "@/app/components/custom";
import { Badge } from "@/components/ui/badge";
import { calculateTotalAmount } from "@/lib/calculations";
import { findUserById } from "@/lib/userActions";
export default async function Page({ params }: { params: { userID: string } }) {
  const data: string = await findUserById({ userID: params.userID });
  const user = await JSON.parse(data);
  const userInformation: UserInfo = user.payload;
  const pledgeAmount = userInformation.amount;
  const totalAmountPaid =
    userInformation?.paymentInfo.length > 0
      ? calculateTotalAmount(userInformation?.paymentInfo)
      : 0;
  const balance = pledgeAmount - totalAmountPaid;
  return (
    <section className="py-5 pb-10 flex flex-col gap-5">
      <TableHeading heading="Summary" />

      <section className="relative top-2 right-2 flex-row-centered gap-2">
        <article className="w-full flex items-center justify-center tablet:justify-start laptop:justify-center  gap-2">
          <Badge className="bg-slate-800 text-white uppercase">Name</Badge>
          <span>
            {`${userInformation.firstName} ${userInformation.surname}`}
          </span>
        </article>
        <article className="w-full flex items-center justify-center tablet:justify-start laptop:justify-center  gap-2">
          <Badge className="bg-slate-800 text-white">Pledge</Badge>
          <span>{userInformation.amount}</span>
        </article>
        <article className="w-full flex items-center justify-center tablet:justify-start laptop:justify-center  gap-2">
          <Badge className="bg-slate-800 text-white">Balance</Badge>
          <span>{balance}</span>
        </article>
      </section>

      <DataTable
        columns={CombinedPaymentColumns}
        data={userInformation.paymentInfo}
        searchType="payment"
      />
    </section>
  );
}
