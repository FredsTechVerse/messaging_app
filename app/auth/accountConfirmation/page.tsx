import React, { FC } from "react";
import AccountConfirmationForm from "./AccountConfirmationForm";
import { Suspense } from "react";
const Page: FC = () => {
  return (
    <article className="fixed inset-0 bg-black/20 flex-col-centered z-20 overflow-auto overflow-x-hidden py-5">
      <Suspense fallback={<p className="text-white">Loading feed...</p>}>
        <AccountConfirmationForm />
      </Suspense>
    </article>
  );
};

export default Page;
