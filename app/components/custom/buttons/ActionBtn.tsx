"use client";
import { FC } from "react";
import { TrashIcon } from "@heroicons/react/24/solid";
interface ButtonProps {
  text: string;
  variant?: "save" | "cancel" | "page" | "edit" | "delete";
  action?: () => void;
}
const ActionBtn: FC<ButtonProps> = (props) => {
  if (props.variant === "delete") {
    return (
      <button className={`flex-row-centered py-1.5 `} onClick={props.action}>
        <TrashIcon className="icon-styling text-slate-700 hover:text-slate-900" />
      </button>
    );
  } else {
    return (
      <button
        className={`text-sm capitalize w-max text-white text-center py-1.5 ${
          props.variant === "cancel"
            ? "bg-red-600 hover:bg-red-700 px-3  laptop:px-4   rounded-md "
            : props.variant === "save"
            ? "bg-slate-600 hover:bg-slate-800 px-3 laptop:px-4  rounded-md "
            : "bg-primary/90 backgrop-blur-xl hover:bg-primary rounded-md py-1.5 px-4"
        }`}
        onClick={props.action}
      >
        {props.text}
      </button>
    );
  }
};

export default ActionBtn;
