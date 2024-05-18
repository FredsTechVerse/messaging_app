import { FC } from "react";
interface TableHeadingProps {
  heading: string | undefined;
}
const TableHeading: FC<TableHeadingProps> = (props) => {
  return (
    <article className="w-full flex-row-centered mt-5 mb-2 uppercase font-bold text-xl">
      {props.heading}
    </article>
  );
};
export default TableHeading;
