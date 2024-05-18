import { FC } from "react";
import { EnvelopeIcon } from "@heroicons/react/24/solid";
import moment from "moment";
interface props {
  date: Date;
  successful: number;
  total: number;
}
const ReminderCard: FC<props> = ({ date, successful, total }) => {
  const formattedDate = moment(date).format("DD-MM-YYYY");
  return (
    <section className="relative col-span-1 row-span-1 w-full h-48  flex flex-col items-start justify-start p-1 border-2 border-slate-400 rounded-lg h-full pb-5">
      <section className="flex items-center justify-between gap-4  w-full  px-2 ">
        <section className="p-2 aspect-square rounded-full bg-orange-200">
          <EnvelopeIcon className="h-6 aspect-square text-slate-800 rounded-lg" />
        </section>
        <section className="font-bold text-md">{formattedDate}</section>
      </section>
      <section className="flex w-full h-full justify-between items-center px-4 py-4">
        <p> Count</p>
        <p>
          <span className="text-5xl font-bold"> {successful}</span>/
          <span className="text-lg font-normal">{total}</span>
        </p>
      </section>
    </section>
  );
};

export default ReminderCard;
