import React from 'react';

const footer = (props) => {
    return(
        <footer className={props.class[0]}>
            <div className={props.class[1]}>
                <h2 className={props.class[2]}>Contact Us</h2>
                <h3 className={props.class[3]}>email</h3>
                <h3 className={props.class[3]}>Contact Number</h3>
                <h3 className={props.class[3]}>Address</h3>
            </div>
        </footer>
    );
}

export default footer;