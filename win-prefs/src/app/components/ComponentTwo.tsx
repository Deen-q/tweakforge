import AddToCart from "./AddToCart"

const ComponentTwo = () => {
    return (
        <div>
            {/* AddToCart is client, not the entirety of Comp2! */}
            <AddToCart />
        </div>
    )
}

export default ComponentTwo

// 