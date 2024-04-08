import { SampleTable } from "@/app/components/custom";
import { Forms, ActionBtns } from "@/app/sections";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ActionBtns />
      <SampleTable />
    </main>
  );
}
