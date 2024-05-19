import { FC } from "react";
import { ChevronRightIcon, EnvelopeIcon } from "@heroicons/react/24/solid";
import { DoughnutChart } from "@/app/components/custom/Charts";
import Link from "next/link";
interface props {
  cardTitle: string;
  chartData: any;
  doughnutName: string;
  doughnutValue: number;
  to: string;
}
const DoughnutCard: FC<props> = ({
  cardTitle,
  chartData,
  doughnutName,
  doughnutValue,
  to,
}) => {
  return (
    <section className=" h-full relative col-span-1 row-span-1 w-full h-48  flex flex-col items-center justify-start p-1 border-2 border-slate-400 rounded-lg pb-5 ">
      <section className="flex items-center justify-between gap-4  w-full  px-2 ">
        <section className="p-2 aspect-square rounded-full bg-orange-200">
          <EnvelopeIcon className="h-6 aspect-square text-slate-800 rounded-lg" />
        </section>
        <section className="font-bold text-md">{cardTitle}</section>
      </section>
      <section className="flex w-full h-full justify-center items-center pl-4 py-4">
        <DoughnutChart
          chartData={chartData}
          doughnutName={doughnutName}
          doughnutValue={doughnutValue}
        />
      </section>
      <Link
        href={to}
        className="absolute bottom-2 right-2 self-end rounded-lg px-3 font-normal text-slate-600  flex-row-centered justify-between text-xl gap-1 group"
      >
        <span className="group-hover:font-bold text-[14px]">View</span>
        <span>
          <ChevronRightIcon className="h-4 aspect-square group-hover:h-6" />
        </span>
      </Link>
    </section>
  );
};

export default DoughnutCard;
