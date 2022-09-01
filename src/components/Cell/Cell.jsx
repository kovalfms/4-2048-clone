import React from 'react';

import {BtnColors} from "../../utils";

import classes from './Cell.module.css'



const Cell = ({num}) => {
    return (
        <div className={classes.cell} style={{background: BtnColors(num)}}>
            {num !== 0 ? num : ''}
        </div>
    );
};

export default Cell;