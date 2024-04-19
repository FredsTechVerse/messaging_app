"use client";
import { FC } from "react";
import { Bars3BottomRightIcon, XMarkIcon } from "@heroicons/react/24/solid";
import UseSideBarState from "@/app/context/UseSideBarState";

interface MenuBtnProps {
  position?: string;
}
const MenuBtn: FC<MenuBtnProps> = (props) => {
  const isSideBarOpen = UseSideBarState((state) => state.isSideBarOpen);
  const toggleNavbar = UseSideBarState((state) => state.toggleSideBar);
  return (
    <button
      className={`bg-primary text-white fixed z-10 bottom-2  right-2 rounded-lg h-10 my-1 px-2  flex items-center justify-center uppercase gap-1 z-20`}
      onClick={toggleNavbar}
    >
      {isSideBarOpen ? "Close " : "Menu"}

      {isSideBarOpen ? (
        <XMarkIcon className={`icon-styling text-white `} />
      ) : (
        <Bars3BottomRightIcon className={`icon-styling text-white`} />
      )}
    </button>
  );
};

export default MenuBtn;
