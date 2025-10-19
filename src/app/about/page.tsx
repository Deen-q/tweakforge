'use client';

import NavBar from "../components/NavBar";
import SidebarLayout from "../components/SidebarLayout";

export default function About() {
    return (
        <div className="flex h-screen w-full overflow-hidden bg-slate-700 text-white text-xs md:text-base">
            <aside className="sm:bg-slate-800 sm:p-4">
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
