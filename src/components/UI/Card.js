import React from 'react';

import classes from './Card.module.css';

const Card = (props) => {
	return (
		<div id='nameCard' className={`${classes.card} ${props.className}`}>
			{props.children}
		</div>
	);
};

export default Card;
