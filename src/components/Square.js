import React from "react";

const Square = ({ value, onClick }) => {
    const valueX_O = value ? `squares ${value}` : `squares`;
    return (
        <button className={valueX_O} onClick={onClick}>
            {value}
        </button>
    );
}

export default Square;