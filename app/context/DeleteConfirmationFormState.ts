"use client";
import { create } from "zustand";

type DeleteConfirmationFormStateProps = {
    isDeleteConfirmationFormOpen: boolean;
    resourceType: string | null;
    resourceID: string;
    setResourceID: (message: string) => void;
    toggleDeleteConfirmationForm: () => void;
    resetDeleteConfirmationForm: () => void;
    setResourceType: (resourceType: string) => void

};

const DeleteConfirmationForm = create<DeleteConfirmationFormStateProps>((set) => ({
    isDeleteConfirmationFormOpen: false,
    resourceType: null,
    resourceID: "",
    setResourceID: (resourceID: string) =>
        set(() => ({ resourceID })),
    setResourceType: (resourceType: string) =>
        set(() => ({ resourceType })),
    toggleDeleteConfirmationForm: () =>
        set((state) => ({ isDeleteConfirmationFormOpen: !state.isDeleteConfirmationFormOpen })),
    resetDeleteConfirmationForm: () => set(() => ({ resourceType: null }))
}));

export default DeleteConfirmationForm;
