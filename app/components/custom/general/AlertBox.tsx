"use client";
import { FC, useEffect } from "react";
import AlertBoxState from "@/app/context/AlertBoxState";
import {
  CheckCircleIcon,
  XMarkIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";

const AlertBox: FC = () => {
  const status = AlertBoxState((state) => state.status);
  const isResponse = AlertBoxState((state) => state.isResponse);
  const timeout = AlertBoxState((state) => state.timeout);
  const initializeAlertBox = AlertBoxState((state) => state.initializeAlertBox);
  const response = AlertBoxState((state) => state.response);

  useEffect(() => {
    if (isResponse) {
      const timeoutId = setTimeout(() => {
        initializeAlertBox();
      }, timeout);

      return () => clearTimeout(timeoutId);
    }
  }, [isResponse, timeout, initializeAlertBox]);
  if (isResponse === true) {
    return (
      <div className="fixed bottom-2 left-2 w-[90%] tablet:w-80  z-50">
        <div
          className={`${
            status === "success"
              ? "border-green-600 bg-green-300"
              : "border-red-600  bg-red-300"
          } text-slate-700 border-0 border-l-8  rounded-md  p-1 flex flex-col  `}
        >
          <span
            onClick={() => {
              initializeAlertBox();
            }}
          >
            <XMarkIcon className="absolute top-1 right-1 ml-auto w-4 h-4 text-slate-600 hover:text-slate-900" />
          </span>

          <p className="flex-row-centered gap-3">
            <span>
              {status === "success" ? (
                <CheckCircleIcon className="icon-styling w-12 h-12 text-green-700" />
              ) : (
                <XCircleIcon className="icon-styling w-12 h-12 text-red-700" />
              )}
            </span>
            <span className="px-2 text-sm tablet:text-md">{response}</span>
          </p>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default AlertBox;
