// better to split NavBar into two: parts of it as server side, other as client side
// for another time...
'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
// import { useState } from "react";


// FOR NOW, HIDE THIS ON SMALL SCREENS?
/// THEN, IMPLEMENT A NEW TYPE OF NAVBAR FOR VERY SMALL SCREENS (phones)
//// even if theres no reason to view TF on mobile, it still makes the app looks janky and unprofessional

export default function NavBar() {
    const pathname = usePathname();
    // const baseNavBarBtnDesign = "flex justify-start items-center h-8 pl-2 rounded";  
    const selectedBtnDesign = "bg-blue-300 text-black"

    return (
        <div className="flex flex-col h-full justify-between w-24"
        // title="currently dummy links"
        >
            <div className="">
                <h1>TweakForge</h1>
            </div>
            <div className={`flex justify-start items-center h-8 pl-2 rounded ${pathname === "/" && selectedBtnDesign}`}>
                {/* <div className=""> */}
                <Link href="/"><h1 className="hover:text-gray-600">scripts</h1></Link>
                {/* </div> */}
            </div>

            <div className={`flex justify-start items-center h-8 pl-2 rounded ${pathname === "/about" && selectedBtnDesign}`}>
                <Link href="/about"><h1 className="hover:text-gray-600">about</h1></Link>
                {/* <p>settings</p> */}
                {/* <p>donate <br />( ͡° ͜ʖ ͡°)</p> */}
            </div>
        </div>
    );
}
