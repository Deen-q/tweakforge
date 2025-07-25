// import Image from "next/image";
// import Link from "next/link";
import NavBar from "./components/NavBar";
import PrefSelection from "./components/PrefSelection";

export default function Home() {
  return (
    // <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
    <div className="grid grid-cols-[110px_1fr]">
      <NavBar />
      {/* <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start"> */}
      <main>
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
          <PrefSelection />
        </div>
      </main>
      {/* <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <p>Footer</p>
      </footer> */}
    </div>
  );
}
