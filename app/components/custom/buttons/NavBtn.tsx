"use client";
import { FC } from "react";
import Link from "next/link";
import UseSideBarState from "@/app/context/UseSideBarState";
interface NavBtnProps {
  to: string;
  text: string;
}
const NavBtn: FC<NavBtnProps> = (props) => {
  const toggleNavbar = UseSideBarState((state) => state.toggleSideBar);
  return (
    <Link href={props.to}>
      <button
        className="w-full text-lg group h-12 2xl:h-16 2xl:text-xl hover:bg-white hover:text-primary text-white capitalize flex flex-row justify-center items-center px-2 rounded-lg "
        onClick={toggleNavbar}
      >
        <span>{props.text}</span>
      </button>
    </Link>
  );
};

export default NavBtn;
