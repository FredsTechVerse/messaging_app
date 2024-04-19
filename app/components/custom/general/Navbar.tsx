"use client";
import React from "react";

import { NavBtn } from "@/app/components/custom";
import UseSideBarState from "@/app/context/UseSideBarState";
const Navbar: React.FC = () => {
  const isSideBarOpen = UseSideBarState((state) => state.isSideBarOpen);
  return (
    <article
      className={`${
        !isSideBarOpen && "hidden"
      } fixed self-end phone:w-[60vw] tablet:w-[270px] bottom-14 right-2  w-full h-max flex phone:flex-col tablet:gap-2 rounded-lg p-2 z-20 backdrop-blur-lg bg-primary  rounded-lg`}
    >
      <NavBtn to="/" text="home" />
      <NavBtn to="/messages" text="messages" />
    </article>
  );
};

export default Navbar;
