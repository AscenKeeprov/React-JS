import React from 'react';
import { filterByKeys } from '../../utilities/object';

class Button extends React.Component {
	render() {
		const buttonProps = filterByKeys(this.props, 'label');
		return (
			<div className="button-wrapper">
				<div className="button-ornament" />
				<button className="button"  {...buttonProps}>
					{this.props.children ? (
						<React.Fragment>
							<span>{this.props.label}</span>
							{this.props.children}
						</React.Fragment>
					) : (
							<React.Fragment>
								{this.props.label}
							</React.Fragment>
						)}
				</button>
				<div className="button-ornament" />
			</div>
		);
	}
}

export default Button;
