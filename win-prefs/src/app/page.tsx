import NavBar from "./components/NavBar";
import PrefSelection from "./components/PrefSelection";
import ToggleDropdown from "./components/ToggleDropdown";

export default function Home() {
  return (
    <div className="flex min-h-screen text-white">
      <aside className="bg-slate-800 p-4">
        <NavBar />
      </aside>
      <main className="flex flex-1 bg-slate-700 p-6 justify-center items-center">
        <div>
          <PrefSelection />
          <p>noob? dw, i got u:</p>
          <ToggleDropdown title="how i run scripts bro?">
            <p>dunno m8</p>
          </ToggleDropdown>
          <ToggleDropdown title="how script werk?">
            <p>dunno m8</p>
          </ToggleDropdown>
        </div>
      </main>
    </div>
  );
}
