import React from 'react';
import classes from './Cell.module.css'


const Cell = ({num}) => {
    return (
        <div className={classes.cell}>
            {num !== 0 ? num : ''}
        </div>
    );
};

export default Cell;