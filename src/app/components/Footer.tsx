// better to split NavBar into two: parts of it as server side, other as client side
// for another time...
'use client';

export default function Footer() {
    return (
        <footer className="hidden sm:block text-center md:text-xs xl:text-sm px-4 pb-1">
            <p>
                TweakForge is an educational tool. Scripts modify Windows 11 registry settings.
                Use at your own risk. Always understand what a script does before running it. See GitHub README for more.
            </p>
            <p>
                Open-source under <a href="https://github.com/Deen-q/tweakforge/blob/main/LICENSE">AGPL-3.0 </a>
                {/* | <a href="/about"> About </a> */}
                | Windows is a trademark of Microsoft Corporation
            </p>
        </footer>
    );
}

