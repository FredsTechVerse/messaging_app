import { FC } from "react";
import { XCircleIcon } from "@heroicons/react/24/solid";

interface FormNavigationProps {
  text: string;
  disableForm?: () => void;
  isCloseBtnDisabled?: boolean;
}
const FormNavigation: FC<FormNavigationProps> = (props) => {
  return (
    <div className=" relative w-full flex justify-center items-center text-lg font-bold text-slate-700 uppercase  px-2 py-5  rounded-t-2xl gap-4 ">
      <span className="w-8 h-[4px] bg-slate-700 rounded-lg"></span>
      {props.text}
      <span className="w-8 h-[4px] bg-slate-700 rounded-lg"></span>
      {!props.isCloseBtnDisabled && (
        <button
          className="absolute top-4.5 right-3"
          onClick={props.disableForm}
        >
          <XCircleIcon className="icon-styling text-slate-800 " />
        </button>
      )}
    </div>
  );
};

export default FormNavigation;
