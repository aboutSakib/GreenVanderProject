import PropTypes from "prop-types";
import ReactPaginate from "react-paginate";

const Pagination = ({ pageCount, handlePageClick }) => {
  return (
    <div className="py-4 w-full overflow-x-auto">
      <ReactPaginate
        className="min-w-[400px] w-full flex justify-center gap-2"
        previousLabel={"← Previous"}
        nextLabel={"Next →"}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={"pagination flex justify-center space-x-2"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link px-3 py-1 border rounded"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link px-3 py-1 border rounded"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link px-3 py-1 border rounded"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link px-3 py-1 border rounded"}
        activeClassName={"bg-blue-500 text-white"}
      />
    </div>
  );
};

Pagination.propTypes = {
  pageCount: PropTypes.number.isRequired,
  handlePageClick: PropTypes.func.isRequired,
};

export default Pagination;
