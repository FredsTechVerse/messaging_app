import { AdminColumns, columns } from "./columns";
import NumberCard from "./NumberCard";
import { findAllPayments, findPaymentDistribution } from "@/lib/paymentActions";
import { DataTable } from "@/app/components/custom";
import { ActionBtns, Reports } from "@/app/(general)/sections";
import { revalidatePath } from "next/cache";
import DoughnutCard from "./DoughnutCard";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { findAllAdmins } from "@/app/auth/libs/adminActions";
import { findAllUsers } from "@/lib/userActions";
import { calculateTotalAmount } from "@/lib/calculations";

export default async function Page() {
  revalidatePath("/admin");
  const session = await getServerSession(options);
  const users = await findAllUsers();
  const admins = await findAllAdmins();
  const payments = await findAllPayments();
  const paymentDistribution = await findPaymentDistribution();
  const usersData = await JSON.parse(users);
  const adminData = JSON.parse(admins);
  const paymentsData = JSON.parse(payments);
  const paymentDistributionData = JSON.parse(paymentDistribution);
  const totalUsers = usersData.payload.length;
  const totalPaymentsMade = calculateTotalAmount(paymentsData?.payload);
  const totalPledgesMade = calculateTotalAmount(usersData?.payload);

  // PAYMENT DATA DISPLAY
  const paymentsChartData: any = {
    labels: ["Disbursed", "Undisbursed"],
    datasets: [
      {
        label: "Payments",
        backgroundColor: ["rgb(53, 162, 235)", "rgb(255, 99, 132)"],
        data: [
          paymentDistributionData.payload?.dispersedPayments || 0,
          paymentDistributionData.payload?.undisbursedPayments || 0,
        ],
      },
    ],
  };

  return (
    <article className="w-full h-max flex flex-col gap-2 pb-5  ">
      <section className=" w-full bg-slate-300 flex items-center justify-between uppercase px-2 font-bold text-lg h-16">
        <h1 className="font-light">{`Greetings ${session?.user?.name}`}</h1>
        <ActionBtns />
      </section>
      <section className="grid grid-cols-1 tablet:grid-cols-3 gap-4  w-full p-2">
        <NumberCard
          title="Total Payments"
          subTitle={`From ${totalUsers} christians`}
          amount={totalPaymentsMade}
          to="/payments"
        />
        <DoughnutCard
          cardTitle="Payments"
          to="/payments"
          chartData={paymentsChartData}
          doughnutName="total"
          doughnutValue={paymentDistributionData.payload?.totalPayments || 0}
        />

        <NumberCard
          title="Total Pledges"
          subTitle={`From ${totalUsers} christians`}
          amount={totalPledgesMade}
          to="/admin"
        />

        <section className=" col-span-1 tablet:col-span-3 row-span-1 tablet:row-span-2 laptop:row-span-1 w-full h-full flex flex-col py-5">
          <section className="flex items-center justify-between ">
            <h2 className=" w-max  uppercase  font-bold flex items-center self-end gap-2 text-lg tablet:text-xl laptop:text-3xl">
              Admins
            </h2>
            {/* <Reports houseInformation={adminData?.payload} /> */}
          </section>
          <DataTable
            searchType="user"
            columns={AdminColumns}
            data={adminData?.payload}
          />
        </section>
        <section className=" col-span-1 tablet:col-span-3 row-span-1 tablet:row-span-2 laptop:row-span-1 w-full h-full flex flex-col py-5">
          <section className="flex items-center justify-between ">
            <h2 className=" w-max  uppercase  font-bold flex items-center self-end gap-2 text-lg tablet:text-xl laptop:text-3xl">
              Christians
            </h2>
            <Reports usersInformation={usersData?.payload} />
          </section>
          <DataTable
            searchType="user"
            columns={columns}
            data={usersData?.payload}
          />
        </section>
      </section>
    </article>
  );
}
