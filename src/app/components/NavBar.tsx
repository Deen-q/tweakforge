// better to split NavBar into two: parts of it as server side, other as client side
// for another time...
'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {
    const pathname = usePathname();
    const navButtonDesign = "flex sm:justify-start items-center px-1 h-12 sm:pl-2 rounded";
    const selectedBtnDesign = "bg-blue-300 text-black";

    return (
        <div className="
        flex fixed justify-evenly items-center bottom-0 left-0 right-0 
        h-14 bg-slate-900/95 backdrop-blur-xs
        sm:static sm:flex-col sm:h-full sm:justify-between sm:bg-transparent sm:w-24
        transition-all duration-200
        ">
            <div className="hidden sm:block">
                <h1>TweakForge</h1>
            </div>
            <div className={`${navButtonDesign} ${pathname === "/" && selectedBtnDesign}`}>
                <Link href="/"><h1 className="hover:text-gray-600">scripts</h1></Link>
            </div>

            <div className={`${navButtonDesign} ${pathname === "/about" && selectedBtnDesign}`}>
                <Link href="/about"><h1 className="hover:text-gray-600">about</h1></Link>
                {/* <p>settings</p> */}
                {/* <p>donate <br />( ͡° ͜ʖ ͡°)</p> */}
            </div>
        </div>
    );
}
