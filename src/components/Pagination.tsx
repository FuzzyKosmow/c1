import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}) => {
  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  const handlePageClick = (page: number) => {
    onPageChange(page);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <button
            key={i}
            className={`${
              currentPage === i ? "bg-black-500 text-white" : "bg-transparent"
            } mx-1 px-3 py-1 rounded hover:bg-gray-200 transition`}
            onClick={() => handlePageClick(i)}
          >
            {i}
          </button>
        );
      }
    } else {
      pageNumbers.push(
        <button
          key={1}
          className={`${
            currentPage === 1 ? "bg-black-500 text-white" : "bg-transparent"
          } mx-1 px-3 py-1 rounded hover:bg-gray-200 transition`}
          onClick={() => handlePageClick(1)}
        >
          1
        </button>
      );
      if (currentPage > 3) {
        pageNumbers.push(
          <span key="dots1" className="mx-1">
            ...
          </span>
        );
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pageNumbers.push(
          <button
            key={i}
            className={`${
              currentPage === i ? "bg-black-500 text-white" : "bg-transparent"
            } mx-1 px-3 py-1 rounded hover:bg-gray-200 transition`}
            onClick={() => handlePageClick(i)}
          >
            {i}
          </button>
        );
      }

      if (currentPage < totalPages - 2) {
        pageNumbers.push(
          <span key="dots2" className="mx-1">
            ...
          </span>
        );
      }

      pageNumbers.push(
        <button
          key={totalPages}
          className={`${
            currentPage === totalPages
              ? "bg-black-500 text-white"
              : "bg-transparent"
          } mx-1 px-3 py-1 rounded hover:bg-gray-200 transition`}
          onClick={() => handlePageClick(totalPages)}
        >
          {totalPages}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="flex items-center justify-between space-x-4">
      {/* Items per page selector */}
      <div className="flex items-center space-x-2">
        <span>View</span>
        <select
          className="border rounded p-1 bg-black-500 text-white"
          value={itemsPerPage}
          onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={5}>5</option>
          <option value={10}>10</option>
        </select>
        <span>items per page</span>
      </div>

      {/* Pagination controls */}
      <div className="flex items-center space-x-2">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded hover:bg-gray-200 transition ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          &lt;
        </button>
        {renderPageNumbers()}
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 rounded hover:bg-gray-200 transition ${
            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Pagination;
