// better to split NavBar into two: parts of it as server side, other as client side
// for another time...
'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

// nav hidden on small screens for now. mobile centric nav needed, even if this app wouldnt be use on phones...

export default function NavBar() {
    const pathname = usePathname();
    const selectedBtnDesign = "bg-blue-300 text-black"

    return (
        <div className="flex flex-col h-full justify-between w-24"
        >
            <div className="">
                <h1>TweakForge</h1>
            </div>
            <div className={`flex justify-start items-center h-8 pl-2 rounded ${pathname === "/" && selectedBtnDesign}`}>
                <Link href="/"><h1 className="hover:text-gray-600">scripts</h1></Link>
            </div>

            <div className={`flex justify-start items-center h-8 pl-2 rounded ${pathname === "/about" && selectedBtnDesign}`}>
                <Link href="/about"><h1 className="hover:text-gray-600">about</h1></Link>
                {/* <p>settings</p> */}
                {/* <p>donate <br />( ͡° ͜ʖ ͡°)</p> */}
            </div>
        </div>
    );
}
