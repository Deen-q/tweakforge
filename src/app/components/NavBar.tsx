// better to split NavBar into two: parts of it as server side, other as client side
// for another time...
'use client';

export default function NavBar() {
    return (
        <div className="min-w-28 flex flex-col h-full justify-between"
            title="currently dummy links"
        >
            {/* <div className="min-w-28 flex flex-col h-screen justify-between"></div> */}
            <div className="flex flex-col justify-start">
                <h3>TweakForge</h3>
            </div>
            <div className="flex flex-col justify-center">
                <p>scripts</p>
            </div>
            <div className="flex flex-col justify-end">
                <p>about</p>
                <p>settings</p>
                <p>donate ( ͡° ͜ʖ ͡°)</p>
            </div>
        </div>
    );
}
