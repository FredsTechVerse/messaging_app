"use client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { ActionMenu } from "../components/custom";
import { calculateTotalAmount } from "@/lib/calculations";

export const columns: ColumnDef<UserInfo>[] = [
  {
    accessorKey: "firstName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          First Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "surname",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Last Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "contact",
    header: "Contact",
  },

  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Pledge
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "balance",
    header: "Balance",
    cell: ({ row }) => {
      const user = row.original;
      const pledgeAmount = user.amount;
      const totalAmountPaid =
        user?.paymentInfo.length > 0
          ? calculateTotalAmount(user?.paymentInfo)
          : 0;
      const balance = pledgeAmount - totalAmountPaid;

      if (balance == 0) {
        return (
          <span className="text-bold px-2 py-0.5 rounded-full text-green-900 bg-green-300">
            Cleared
          </span>
        );
      } else if (balance < 0) {
        return (
          <span className="text-bold px-2 py-0.5 rounded-full text-green-900 bg-green-300">
            {balance}
          </span>
        );
      } else {
        return (
          <span className="text-bold px-2 py-0.5 rounded-full text-red-900 bg-red-300">
            {balance}
          </span>
        );
      }
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const user = row.original;
      return <ActionMenu userID={user._id} />;
    },
  },
];
