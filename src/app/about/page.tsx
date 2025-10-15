'use client';

// import { useState } from "react";
import NavBar from "../components/NavBar";
import SidebarLayout from "../components/SidebarLayout";
// import ToggleDropdown from "../components/ToggleDropdown";

export default function About() {
    return (
        <div className="flex h-screen overflow-hidden w-full bg-slate-700 text-white">
            <aside className="bg-slate-800 p-4 hidden sm:block"> {/* >>> hidden content is not ideal - fix later!*/}
                <NavBar />
            </aside>
            <div className="flex flex-col flex-1 ">
                <main className="flex-1">
                    <SidebarLayout />
                </main>
                <footer className="text-center pb-1">
                    all scripts are property of Microsoft. by continuing, you agree TweakForge is not responsible for improper script usage
                </footer>
            </div>
        </div>
    );
}
