"use client";
import { create } from "zustand";

type SideBarStateProps = {
    isSideBarOpen: boolean;
    toggleSideBar: () => void;
};


const UseSideBarState = create<SideBarStateProps>((set) => ({
    isSideBarOpen: false,
    toggleSideBar: () =>
        set((state) => ({ isSideBarOpen: !state.isSideBarOpen })),
}));

export default UseSideBarState;
