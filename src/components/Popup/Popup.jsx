import React from 'react';

import classes from './Popup.module.css'

export const Popup = ({text, resetGame}) => {
    return (
        <div className={classes.popup}>
            <div className={classes.popup_inner}>
                {text}
                <button onClick={resetGame}>NEW GAME</button>
            </div>
        </div>
    );
};
