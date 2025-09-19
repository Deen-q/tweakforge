// better to split NavBar into two: parts of it as server side, other as client side
// for another time...
'use client';


// FOR NOW, HIDE THIS ON SMALL SCREENS?
/// THEN, IMPLEMENT A NEW TYPE OF NAVBAR FOR VERY SMALL SCREENS (phones)
//// even if theres no reason to view TF on mobile, it still makes the app looks janky and unprofessional

export default function NavBar() {
    return (
        <div className="flex flex-col h-full justify-between w-24"
            title="currently dummy links"
        >
            {/* <div className="min-w-28 flex flex-col h-screen justify-between"></div> */}
            <div className="flex flex-col justify-start">
                <h1>TweakForge</h1>
            </div>
            <div className="flex flex-col justify-center">
                <p>scripts</p>
            </div>
            <div className="flex flex-col justify-end">
                <p>about</p>
                <p>settings</p>
                <p>donate <br />( ͡° ͜ʖ ͡°)</p>
            </div>
        </div>
    );
}
