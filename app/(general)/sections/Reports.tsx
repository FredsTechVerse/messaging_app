"use client";
import React, { FC } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { ActionBtn } from "@/app/components/custom";
import moment from "moment";
import { calculateTotalAmount } from "@/lib/calculations";
interface ReportGenerationProps {
  usersInformation: UserInfo[];
}
const Reports: FC<ReportGenerationProps> = ({ usersInformation }) => {
  const date = Date.now();
  const formattedDate = moment(date).format("DD-MM-YYYY");
  const createReport = ({ usersInformation }: ReportGenerationProps) => {
    const refinedInformation = usersInformation?.map((user, index) => {
      const pledge = user.amount;
      const paymentsMade = calculateTotalAmount(user.paymentInfo);
      return [user.firstName, user.surname, user.contact, pledge, paymentsMade];
    });

    let totalPayments = 0;
    let totalPledges = 0;
    refinedInformation.forEach((info: any) => {
      totalPledges += Number(info[3] || 0);
      totalPayments += Number(info[4] || 0);
    });

    const doc = new jsPDF();
    const title = "FUNDRAISER SUMMARY";
    const date = `Date : ${formattedDate} `;

    // doc.addImage(logoDataURL, "PNG", 10, 10, 30, 30); // Adjust x, y, width, height as needed
    doc.setFontSize(18);
    doc.setFont("", "bold");
    doc.text(title, 80, 12);
    doc.setFontSize(8);
    doc.text(date, 175, 5);

    autoTable(doc, {
      startY: 20,
      head: [["FNAME", "LNAME", "CONTACT", "PLEDGE", "PAYMENTS"]],
      body: refinedInformation,
      foot: [["TOTALS", "", "", totalPledges, totalPayments]],
    });
    doc.save(`FUNDRAISER SUMMARY`);
  };

  return (
    <section id="button" className="w-max">
      <ActionBtn
        text="Generate Report"
        action={() =>
          createReport({
            usersInformation,
          })
        }
      />
    </section>
  );
};

export default Reports;
