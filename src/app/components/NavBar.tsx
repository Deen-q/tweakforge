'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {
    const pathname = usePathname();
    const navLinkStyles = "flex sm:justify-start items-center px-1 h-12 hover:text-gray-600 hover:scale-99 sm:pl-2 rounded";
    const activeNavLinkStyles = "bg-blue-300 text-black";

    const getLinkClassName = (path: string) => `${navLinkStyles} ${pathname === path && activeNavLinkStyles}`;

    return (
        <nav className="
        flex fixed justify-evenly items-center bottom-0 left-0 right-0 
        h-14 bg-slate-900/95 backdrop-blur-xs
        sm:static sm:flex-col sm:h-full sm:justify-between sm:bg-transparent sm:w-24
        transition-all duration-200
        ">
            <div className="hidden sm:block">
                <h1 className="font-bold">TweakForge</h1>
            </div>
            <Link
                href="/"
                aria-current={pathname === "/" ? "page" : undefined}
                className={getLinkClassName("/")}
            >
                <span>scripts</span>
            </Link>
            <Link
                href="/about"
                aria-current={pathname === "/about" ? "page" : undefined}
                className={getLinkClassName("/about")}
            >
                <span>about</span>
            </Link>
            {/* <p>settings</p> */}
            {/* <p>donate <br />( ͡° ͜ʖ ͡°)</p> */}
        </nav>
    );
}
