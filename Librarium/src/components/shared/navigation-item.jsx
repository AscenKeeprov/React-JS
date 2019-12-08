import { NavLink } from 'react-router-dom';
import ObjectUtilities from '../../utilities/object';
import React from 'react';

export default function NavigationItem(props) {
	const linkProps = ObjectUtilities.dropKeys(props, 'label');
	return (
		<li className="nav-item">
			<NavLink className="nav-link" {...linkProps}>{props.label}</NavLink>
		</li>
	);
}
