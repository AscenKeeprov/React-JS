import React, { useRef } from 'react';

function CataloguePagination(props) {
	const { currentPage, pagesCount } = props;
	const pageRef = useRef(null);

	const goToNextPage = () => {
		const currentPage = pageRef.current;
		let currentPageNumber = parseInt(currentPage.value);
		const lastPageNumber = parseInt(props.pagesCount);
		if (currentPageNumber < lastPageNumber) {
			currentPage.value = currentPageNumber + 1;
			props.onPageChange(currentPage.value);
		}
	}

	const goToPage = (event) => {
		const currentPage = event.target;
		const currentPageNumber = Math.round(currentPage.value);
		const lastPageNumber = parseInt(props.pagesCount);
		if (currentPageNumber >= 1 && currentPageNumber <= lastPageNumber) {
			props.onPageChange(currentPageNumber);
		}
	}

	const goToPreviousPage = () => {
		const currentPage = pageRef.current;
		let currentPageNumber = parseInt(currentPage.value);
		if (currentPageNumber > 1) {
			currentPage.value = currentPageNumber - 1;
			props.onPageChange(currentPage.value);
		}
	}

	return (
		<React.Fragment>
			<button onClick={goToPreviousPage} title="Previous page">&#11207;</button>
			<input max={pagesCount || 1} min="1" onChange={goToPage} onWheel={e => e.preventDefault()} ref={pageRef} required step="1" title="Page" type="number" value={currentPage || 1} />
			<small>&nbsp;of&nbsp;</small>
			<input disabled type="number" value={pagesCount || 1} />
			<button onClick={goToNextPage} title="Next page">&#11208;</button>
		</React.Fragment>
	);
}

export default CataloguePagination;
