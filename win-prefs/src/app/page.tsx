// import Image from "next/image";
// import Link from "next/link";
import NavBar from "./components/NavBar";
import PrefSelection from "./components/PrefSelection";

export default function Home() {
  return (
    <div className="grid grid-cols-[150px_1fr] grid-rows-[1fr] min-h-screen text-white">
      <aside className="bg-slate-600 col-start-1 row-start-1 p-4">
        <NavBar />
      </aside>
      <main className="bg-slate-500 col-start-2 row-start-1 p-8">
        <div>
          <PrefSelection />
        </div>
      </main>
    </div>
  );
}
