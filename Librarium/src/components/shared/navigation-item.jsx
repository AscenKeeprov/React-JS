import { filterByKeys } from '../../utilities/object';
import { NavLink } from 'react-router-dom';
import React from 'react';

export default function NavigationItem(props) {
	const linkProps = filterByKeys(props, 'label');
	return (
		<li className="nav-item">
			<NavLink className="nav-link" {...linkProps}>{props.label}</NavLink>
		</li>
	);
}
