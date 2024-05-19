import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { SubTitle } from "chart.js";
import Link from "next/link";
import { FC } from "react";

interface props {
  title: string;
  subTitle: string;
  amount: number;
  to: string;
}

const NumberCard: FC<props> = ({ title, subTitle, amount, to }) => {
  return (
    <section className="relative w-full h-full  flex flex-col items-start justify-start rounded-lg p-2  text-slate-600 border-2 border-slate-400 gap-4 overflow-auto col-span-1 row-span-1">
      <section className="flex flex-col items-start justify-between w-full gap-2">
        <h1 className="uppercase text-lg laptop:text-xl font-bold">{title}</h1>
        <p className=" text-sm text-slate-600">{subTitle}</p>
      </section>

      <section className="flex flex-col w-full h-full justify-center items-start px-2  laptop:py-4 ">
        <section className="flex-row-centered gap-2">
          <span className="font-bold text-lg">Ksh</span>{" "}
          <span className="text-2xl tablet:text-4xl laptop:text-6xl font-extrabold">
            {amount}
          </span>
        </section>
      </section>
      <Link
        href={to}
        className="laptop:absolute laptop:bottom-1.5 laptop:right-0 self-end rounded-lg px-3 font-normal text-slate-600  flex-row-centered justify-between text-xl gap-1 group"
      >
        <span className="group-hover:font-bold text-[13px] laptop:text-[16px]">
          View
        </span>
        <span>
          <ChevronRightIcon className="h-3 laptop:h-4 aspect-square group-hover:h-5" />
        </span>
      </Link>
    </section>
  );
};

export default NumberCard;
