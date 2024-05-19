import { FC } from "react";
import { MultiLineChart } from "@/app/components/custom/Charts";
interface Props {
  chartData: any;
  chartName: string;
}

const Graph: FC<Props> = ({ chartData, chartName }) => {
  return (
    <section className="col-span-1 tablet:col-span-3 laptop:col-span-2 row-span-2 w-full h-full ">
      <MultiLineChart chartData={chartData} chartName={chartName} />
    </section>
  );
};
export default Graph;
