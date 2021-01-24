import React, {useState} from 'react'
import Reveal from 'react-reveal/Reveal';
import classes from './Benefits.module.css';

const Benefits = () => {


    const [showOnPage, setShowOnPage] = useState('hotDeals');


    return (
        <Reveal>
            <div className={classes.BenefitsDiv}>
                <button>Hot Deals</button>
                <button>Competitions</button>
                <button>Phones & Computers</button>
                <button>Team Member Referal Programm</button>
                <button>Gateways</button>
                <button>Tickets & Entertainment</button>
                <button>Gifts</button>
                <button>Clothing & Fashion</button>
                <button>Health & Wellbeing</button>
                <button>Home & Finance</button>
                <button>Vehicles</button>
            </div>
        </Reveal>
    );
}

export default Benefits;