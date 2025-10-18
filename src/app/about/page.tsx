'use client';

import NavBar from "../components/NavBar";
import SidebarLayout from "../components/SidebarLayout";

export default function About() {
    return (
        <div className="flex h-screen w-full overflow-hidden bg-slate-700 text-white">
            <aside className="bg-slate-800 hidden sm:block p-4"> {/* >>> hidden content is not ideal - fix later!*/}
                <NavBar />
            </aside>
            <div className="flex flex-col">
                <main className="flex h-full justify-center">
                    <SidebarLayout />
                </main>
            </div>
        </div>
    );
}
