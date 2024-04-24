"use client";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { MessageTableActionBtns } from "@/app/components/custom";

export type Message = {
  _id: string;
  message: string;
  totalCount: string;
  successful: string;
  unsuccessful: string;
  unsuccessfulRecipients: string;
};

export const columns: ColumnDef<Message>[] = [
  {
    accessorKey: "totalCount",
    header: "Recipients",
  },
  {
    accessorKey: "successful",
    header: "Successful",
  },
  {
    accessorKey: "unsuccessful",
    header: "Unsucessful",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const message = row.original;
      return <MessageTableActionBtns messageID={message._id} />;
    },
  },
];
