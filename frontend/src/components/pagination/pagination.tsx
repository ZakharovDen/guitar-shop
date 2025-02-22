type PaginationProps = {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

function Pagination({ totalPages, currentPage, onPageChange }: PaginationProps): JSX.Element {
  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();
  return (
    <div className="pagination product-list__pagination">
      <ul className="pagination__list">
        {pageNumbers.map(pageNumber => (
          <li
            key={pageNumber}
            className={`pagination__page ${currentPage === pageNumber ? 'pagination__page--active' : ''}`}
          >
            <a
              className="link pagination__page-link"
              href={`#${pageNumber}`}
              onClick={(e) => {
                e.preventDefault();
                onPageChange(pageNumber);
              }}
            >
              {pageNumber}
            </a>
          </li>
        ))}
        <li className="pagination__page pagination__page--next" id="next">
          <a
            className="link pagination__page-link"
            href={`#${currentPage + 1}`}
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < totalPages) {
                onPageChange(currentPage + 1);
              }
            }}
          >
            Далее
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Pagination;