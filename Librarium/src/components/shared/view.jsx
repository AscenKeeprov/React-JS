import React from 'react';

const titleDelimiter = ' | ';

class View extends React.Component {
	componentDidMount() {
		let viewTitle = this.props.title;
		if (!viewTitle) {
			document.title = this.siteTitle;
			const message = 'View title has not been specified!';
			try {
				let stackTrace = [];
				const ownSource = this._reactInternalFiber._debugSource;
				stackTrace.push(`${ownSource.fileName}:${ownSource.lineNumber}`);
				const ownerSource = this._reactInternalFiber._debugOwner._debugSource;
				if (ownerSource) stackTrace.push(`${ownerSource.fileName}:${ownerSource.lineNumber}`);
				console.warn(`${message}\r\n${stackTrace.join('\r\n')}`);
			} catch { console.warn(`${message}`); }
		} else document.title = `${viewTitle}${titleDelimiter}${this.siteTitle}`;
	}

	componentWillUnmount() {
		document.title = this.siteTitle;
	}

	render() {
		this.siteTitle = document.title.split(titleDelimiter)[1]
			|| document.title.split(titleDelimiter)[0];
		return this.props.children;
	}
}

export default View;
