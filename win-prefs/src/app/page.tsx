import NavBar from "./components/NavBar";
import PrefSelection from "./components/PrefSelection";

export default function Home() {
  return (
    <div className="flex min-h-screen text-white">
      <aside className="bg-slate-600 p-4">
        <NavBar />
      </aside>
      <main className="flex flex-1 bg-slate-500 p-6 justify-center items-center">
        <div>
          <PrefSelection />
        </div>
      </main>
    </div>
  );
}
