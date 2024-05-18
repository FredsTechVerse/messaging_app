"use client";
import { ColumnDef } from "@tanstack/react-table";
import { PaymentMenu } from "@/app/components/custom";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import moment from "moment";

export const CombinedPaymentColumns: ColumnDef<PaymentInfo>[] = [
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const payment = row.original;
      const date = payment.date;
      const formattedDate =
        typeof date === "string" ? moment(date).format("DD-MM-YYYY") : date;
      return <span>{formattedDate.toString()}</span>;
    },
  },
  {
    accessorKey: "referenceID",
    header: "ReferenceID",
  },
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "surname",
    header: "Last Name",
  },
  {
    accessorKey: "modeOfPayment",
    header: "Mode",
  },

  {
    accessorKey: "contact",
    header: "Contact",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <span
          className={`text-bold px-2 py-0.5 rounded-full ${
            user.status == "disbursed"
              ? "text-green-900 bg-green-300"
              : "text-red-900 bg-red-300"
          }`}
        >
          {user.status}
        </span>
      );
    },
  },

  {
    id: "actions",
    header: () => {
      return (
        <section className="flex-row-centered justify-end pr-4">
          Actions
        </section>
      );
    },
    cell: ({ row }) => {
      const payment = row.original;
      return <PaymentMenu paymentID={payment._id} />;
    },
  },
];
