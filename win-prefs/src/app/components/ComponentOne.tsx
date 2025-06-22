
const ComponentOne = () => {
    return (
        <div>
            <button onClick={() => console.log('Click')}>Add</button>
        </div>
    )
}

export default ComponentOne

// server comps cant handle user reactivity
// i.e., a click event button in this comp would not work
// -> as in, you render this component in root page.tsx

// 1st option (not ideal): add 'use client' on L1
// Or: see ComponentTwo