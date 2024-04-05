import Image from "next/image";
import { SampleTable } from "@/components/custom";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SampleTable />
    </main>
  );
}
