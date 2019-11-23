import React from 'react';

class Button extends React.Component {
	render() {
		let buttonProps = Object.fromEntries(
			Object.entries(this.props).filter(e => e[0] !== 'label')
		);
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
