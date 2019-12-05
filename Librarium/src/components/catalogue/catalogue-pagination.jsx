import React from 'react';
import useStateWithCallback from '../../hooks/useStateWithCallback';

function CataloguePagination(props) {
	const [currentPage, setCurrentPage] = useStateWithCallback(+props.startPage || 1, () => {
		props.onPageChange(currentPage);
	});
	const lastPage = +props.pagesCount || 1;

	const goToNextPage = () => {
		if (currentPage < lastPage) {
			setCurrentPage(+currentPage + 1);
		}
	}

	const goToPage = (event) => {
		const page = Math.round(+event.target.value);
		if (page >= 1 && page <= lastPage) {
			setCurrentPage(page);
		}
	}

	const goToPreviousPage = () => {
		if (currentPage > 1) {
			setCurrentPage(+currentPage - 1);
		}
	}

	return (
		<React.Fragment>
			<button onClick={goToPreviousPage} title="Previous page">&#11207;</button>
			<input max={lastPage} min="1" onChange={goToPage} required step="1" title="Page" type="number" value={currentPage} />
			<small>&nbsp;of&nbsp;</small>
			<input disabled type="number" value={lastPage} />
			<button onClick={goToNextPage} title="Next page">&#11208;</button>
		</React.Fragment>
	);
}

export default CataloguePagination;
