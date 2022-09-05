import React from 'react';

import {cellColors} from "../../utils";

import classes from './Cell.module.css'


export const Cell = ({num}) => {
    return (
        <div className={classes.cell} style={{background: cellColors(num)}}>
            {num !== 0 ? num : ''}
        </div>
    );
};
