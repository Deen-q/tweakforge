'use client';

import NavBar from "../components/NavBar";
import SidebarLayout from "../components/SidebarLayout";

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
                    <p>
                        TweakForge is an educational tool. Scripts modify Windows registry settings.
                        Use at your own risk. Always understand what a script does before running it.
                    </p>
                    <p>
                        Open source under <a href="https://github.com/Deen-q/tweakforge/blob/main/LICENSE">AGPL-3.0 </a>
                        {/* | <a href="/about"> About </a> */}
                        | Windows is a trademark of Microsoft Corporation
                    </p>
                </footer>
            </div>
        </div>
    );
}
