import React from 'react';

class PageTitle extends React.Component {
	constructor(props) {
		super(props);
		this.delimiter = ' | ';
	}

	componentDidMount() {
		document.title = `${this.props.value}${this.delimiter}${this.siteTitle}`;
	}

	componentWillUnmount() {
		document.title = this.siteTitle;
	}

	render() {
		if (!this.props.value) throw new Error('Page title has not been specified!');
		this.siteTitle = document.title.split(this.delimiter)[1]
			|| document.title.split(this.delimiter)[0];
		return null;
	}
}

export default PageTitle;
