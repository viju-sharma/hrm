import React from 'react';
import classes from './HomeIntro.module.css';
import MetaTags from 'react-meta-tags';

const homeIntro = (props) => {
    return (
        <React.Fragment>
            <MetaTags>
                <meta name="viewport" content="height=device-height, initial-scale=1.0" />
            </MetaTags>
                <div className={classes.Introduction}>
                    <h1 className={classes.IntroductionHeading}>A <em className={classes.Hub}>HUB</em> TO MANAGE YOUR RESOURCES,<br/> PROJECTS AND MANY MORE</h1>
                </div>
        </React.Fragment>
);
}

export default homeIntro;