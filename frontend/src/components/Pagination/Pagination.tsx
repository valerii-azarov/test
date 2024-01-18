import React from "react";
import "./style.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
  onPageChange: (newPage: number) => void;
  onItemsPerPageChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, itemsPerPage, totalItems, onPageChange, onItemsPerPageChange }) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="pagination-controls">
      <select
        className="pagination-columns-select"
        value={itemsPerPage}
        onChange={onItemsPerPageChange}
      >
        {[5, 10, 15, 20, 25].map((perPage) => (
          <option key={perPage} value={perPage}>
            {perPage}
          </option>
        ))}
      </select>
      <div className="pagination-count">
        <span>{`${startItem}-${endItem} із ${totalItems}`}</span>
      </div>
      <button
        className="pagination-prev-button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <i className="fa-solid fa-angle-left" />
      </button>
      <button
        className="pagination-next-button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <i className="fa-solid fa-angle-right" />
      </button>
    </div>
  );
};

export default Pagination;
