import React, { useState } from 'react'
import { css } from "@emotion/core";
import PacmanLoader from "react-spinners/PacmanLoader";


const override = css`
    display: block;
    margin: 2;    
    border-color: red;
`;

export default function Spinner() {
    const [loading, setstate] = useState(true)
    return (
        <div className="sweet-loading spinner">
            <PacmanLoader
                css={override}
                size={25}
                color={"#36D7B7"}
                loading={loading}
            />
        </div>
    )
}
