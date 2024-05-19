import { FC } from "react";
import { ChevronRightIcon, EnvelopeIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
interface props {
  title: string;
  figure: number;
  to: string;
}
const TextCard: FC<props> = ({ title, figure, to }) => {
  return (
    <section className="relative col-span-1 row-span-1 w-full h-48  flex flex-col items-start justify-start p-1 border-2 border-slate-400 rounded-lg h-full pb-5">
      <section className="flex items-center justify-between gap-4  w-full  px-2 ">
        <section className="p-2 aspect-square rounded-full bg-orange-200">
          <EnvelopeIcon className="h-6 aspect-square text-slate-800 rounded-lg" />
        </section>
        <section className="font-bold text-md">{title}</section>
      </section>
      <section className="flex w-full h-full justify-between items-center pl-4 py-4">
        <span className="text-5xl font-bold">{figure}</span>
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

export default TextCard;
