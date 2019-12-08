import ObjectUtilities from '../../utilities/object';
import React from 'react';

export default function Button(props) {
	const buttonProps = ObjectUtilities.dropKeys(props, 'label');
	return (
		<div className="button-wrapper">
			<div className="button-ornament" />
			<button className="button"  {...buttonProps}>
				{props.children ? (
					<React.Fragment>
						<span>{props.label}</span>
						{props.children}
					</React.Fragment>
				) : (
						<React.Fragment>
							{props.label}
						</React.Fragment>
					)}
			</button>
			<div className="button-ornament" />
		</div>
	);
}
