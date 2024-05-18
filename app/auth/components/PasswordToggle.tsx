"use client";
import { FC } from "react";
import { EyeIcon } from "@heroicons/react/24/solid";
import { EyeSlashIcon } from "@heroicons/react/24/solid";

interface PasswordToggleProps {
  isPasswordReadEnabled: boolean;
  togglePasswordRead: () => void;
}

const PasswordToggle: FC<PasswordToggleProps> = ({
  isPasswordReadEnabled,
  togglePasswordRead,
}) => {
  return (
    <p
      onClick={togglePasswordRead}
      className="flex-row-centered w-max bg-slate-200 rounded-lg px-2"
    >
      {!isPasswordReadEnabled ? (
        <EyeIcon className="icon-styling h-5 ml-auto" />
      ) : (
        <EyeSlashIcon className="icon-styling h-5 ml-auto" />
      )}
    </p>
  );
};

export default PasswordToggle;
