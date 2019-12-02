import React from 'react';

function withForwardRef(Component) {
	function target(props, ref) {
		return <Component {...props} forwardRef={ref} />
	}

	target.displayName = `${Component.displayName || Component.name || 'Component'}WithForwardRef`;

	return React.forwardRef(target);
}

export default withForwardRef;
